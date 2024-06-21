import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation - 1716365345627 (1).json';
import LoadingAnimation from '../assets/Animation - 1716467974900 (1).json'; // Correct import path
import apiService from '../services/apiService'; // Import apiService

interface AuthProps {
  isLogin: boolean;
}

const Auth: React.FC<AuthProps> = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading animation
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Activate loading state

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { username, password } : { username, email, password };

    try {
      const { data } = await apiService.post(url, payload);
      setMessage(data.message);
      if (isLogin) {
        localStorage.setItem('token', data.token);
        navigate('/home');  // Redirect to home after successful login
      } else {
        setMessage('Registration successful. Please login.');
        navigate('/');  // Redirect to login after successful registration
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong.');
      }
    } finally {
      setLoading(false); // Deactivate loading state
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultOptionss = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const lottieContainerStyle: React.CSSProperties = {
    background: 'none',
  };

  const lottieContainerResponsiveStyle: React.CSSProperties = {
    ...lottieContainerStyle,
    display: 'none',
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {loading ? (
        <div className=' h-screen flex items-center justify-center'>
          <Lottie options={defaultOptionss} height={400} width={700} />
        </div>
      ) : (
        <>
          <h1 className="text-left justify-start text-7xl px-8 pt-24 text-blue-600">San Post</h1>
          <p className="pt-20 text-3xl p-7 text-blue-400 text-center">Unleash Your Full Potential: Embrace New Opportunities and Achieve Your Dreams!</p>
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:divide-x-2 lg:p-6 sm:p-6 sm:flex-col sm:items-center sm:divide-x-0">
            <form onSubmit={handleSubmit} className="p-6 w-full max-w-md">
              {!isLogin && (
                <div>
                  <h1 className='text-2xl text-blue-600'>Register</h1>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="username" className="block mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded">
                {isLogin ? 'Login' : 'Register'}
              </button>
              {message && <p className="mt-4 text-red-500">{message}</p>}
            </form>
            <div
              className="lottie-container p-6 justify-center items-center"
              style={isMobile ? lottieContainerResponsiveStyle : lottieContainerStyle}
            >
              <Lottie options={defaultOptions} height={400} width={700} />
            </div>
          </div>
          {!isLogin ? (
            <Link to="/" className='text-black pt-6 text-3xl justify-start left-0'>
              Link to Login ➡️
            </Link>
          ) : (
            <div className='flex justify-between'>
              <Link to="/register" className='text-black pt-6 text-3xl justify-start left-0'>
                Link to Registration ➡️
              </Link>
              <Link to="/forget" className='text-black pt-6 text-3xl justify-start left-0'>
                Link to Forget Password ➡️
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Auth;
