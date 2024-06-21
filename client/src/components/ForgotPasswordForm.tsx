import React, { useState } from 'react';
import apiService from '../services/apiService'; // Import apiService instead of axios

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.post('/api/forgotpassword', { email, newPassword });
      setMessage(response.data.message); // Assuming your backend sends a message on success
      setEmail('');
      setNewPassword('');
    } catch (error:any) {
      if (error.response && error.response.status === 404) {
        setMessage('Password reset endpoint not found. Please try again later.');
      } else {
        console.error('Error resetting password:', error);
        setMessage('Failed to reset password. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6} // Example: Minimum length for password
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
        </div>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
