import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PostProps {
  post: {
    _id: string;
    text: string;
    user: {
      _id: string;
      username: string;
    };
    likes: string[];
    comments: {
      _id: string;
      text: string;
      user: {
        _id: string;
        username: string;
      };
      createdAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [likes, setLikes] = useState<string[]>(post.likes);
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<{
    _id: string;
    text: string;
    user: { _id: string; username: string };
    createdAt: string;
  }[]>(post.comments);

  // useEffect to refresh the page when comments state changes
  useEffect(() => {
    const refreshPage = () => {
      window.location.reload();
    };

    setComments(post.comments); // Update comments state initially
    // Listen for changes in comments state
    if (comments !== post.comments) {
      refreshPage();
    }
  }, [comments]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API returns the updated likes array
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment`, { text: commentText }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API returns the new comment object
      const newComment = response.data;
      setComments([...comments, newComment]);
      setCommentText(''); // Clear comment text input after submission
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="p-4 my-4 bg-white rounded shadow-md">
      <p>{post.text}</p>
      <p className="text-sm text-gray-500 mb-2">Posted by: {post.user.username}</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.map(comment => (
          <div key={comment._id} className="bg-gray-100 rounded p-2 mb-2">
            <p>{comment.text}</p>
            <p className="text-xs text-gray-500">Comment by: {comment.user.username}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Write a comment..."
          rows={3}
          required
        />
        <button type="submit" className="px-3 py-2 mt-2 text-white bg-blue-500 rounded">
          Post Comments
        </button>
      </form>

      <button onClick={handleLike} className="px-3 py-2 mt-2 text-white bg-blue-500 rounded">
        Like ({likes.length})
      </button>
    </div>
  );
};

export default Post;
