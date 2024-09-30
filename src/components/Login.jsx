import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Please fill in all fields.');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:8081/user/login', { 
          email,
          password,
        });
        
        const data = await response.data;
        if (data.userID) {
          localStorage.setItem("userID", data.userID);
          if (data.role === 'mentor') {
            navigate(`/mentees`);
          } else if (data.role === 'mentee') {
            navigate(`/mentors`);
          }
        }
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    }
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2 h-4 w-4"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
        </div>
        <button
          type="submit"
          className="w-full bg-[#4f759b] text-white font-semibold py-2 rounded hover:bg-[#3f6390] focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          <a href="/reset-password" className="text-[#4f759b] hover:underline">
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
