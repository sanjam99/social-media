import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Post from './Post';
import NewPostForm from './NewPostForm';
import { Post as PostType } from '../models/Post'; // Import Post interface

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<PostType[]>(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData(); // Call fetchData immediately when component mounts
  }, []);

  const handlePostCreated = async () => {
    try {
      const { data } = await axios.get<PostType[]>(`${import.meta.env.VITE_API_URL}/api/posts`);
      setPosts(data); // Fetch posts after new post is created
    } catch (error) {
      console.error('Error fetching posts after creation:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage (adjust as per your setup)
    // No need to redirect programmatically if using Link
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/" onClick={handleLogout} className="px-3 py-2 bg-red-500 text-white rounded">
          Logout
        </Link>
      </div>
      <NewPostForm onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
