import React, { useState } from 'react';

interface NewPostFormProps {
  onPostCreated: () => void; // Callback function to update parent component
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPostCreated }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Assuming the API returns the newly created post object
      console.log('New post created:', data);
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
