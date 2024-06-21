import React, { useState } from 'react';
import axios from 'axios';

interface NewPostFormProps {
  onPostCreated: () => void; // Callback function to update parent component
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPostCreated }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, { text }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API returns the newly created post object
      console.log('New post created:', response.data);
      setText(''); // Clear form input
      onPostCreated(); // Notify parent component to refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        placeholder="Write your post..."
        rows={5}
        required
      />
      <button type="submit" className="px-3 py-2 mt-2 text-white bg-blue-500 rounded">
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
