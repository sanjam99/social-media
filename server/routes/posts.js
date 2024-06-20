const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
    const { text } = req.body;
    try {
        const newPost = new Post({ text, user: req.userId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Get Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('comments.user');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Update Post
router.patch('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

        post.text = text;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Delete Post
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'User not authorized to delete this post' });
        }
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
});

// Like Post
router.patch('/:id/like', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const index = post.likes.findIndex((id) => id.toString() === req.userId);
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id.toString() !== req.userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Comment on Post
router.post('/:id/comment', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = { text, user: req.userId };
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
