import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService'; // Import apiService instead of axios
import Post from './Post';
import NewPostForm from './NewPostForm';
import { Post as PostType } from '../models/Post';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
      const { data } = await apiService.get<PostType[]>('/api/posts');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Call fetchPosts immediately when component mounts
  }, []);

  const handlePostCreated = async () => {
    fetchPosts(); // Fetch posts after new post is created
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage (adjust as per your setup)
    // No need to redirect programmatically if using Link
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/" onClick={handleLogout} className="px-3 py-2 bg-red-500 text-white rounded">
          Logout
        </Link>
      </div>
      <NewPostForm onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Post key={post._id} post={post} onRefreshPosts={fetchPosts} />
      ))}
    </div>
  );
};

export default Posts;
