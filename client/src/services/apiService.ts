import axios from 'axios';

const baseURL = 'https://social-media-h2sk.onrender.com'; // Adjust this to your backend URL

const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;
