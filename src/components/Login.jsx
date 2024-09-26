import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
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
        // Simulated API call
        const response = await fakeApiLogin(email, password); // Replace with actual API call
        if (response.success) {
          if (rememberMe) {
            localStorage.setItem('userEmail', email); // Store email in local storage if "Remember Me" is checked
          }
          navigate('/mentor-search'); // Redirect on success
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  // Simulated login function (for demonstration)
  const fakeApiLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: email === 'test@example.com' && password === 'password123' });
      }, 1000);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-sm">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          <a href="/reset-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
