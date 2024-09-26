import React from 'react';
import TypewriterEffect from './TypewriterEffect'; // Adjust the path as needed

const Homepage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Mentor Mentee Match</h1>
      <p className="text-lg text-center mb-8">
        Connect with experienced mentors or find eager mentees to share knowledge and skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">For Mentors</h2>
          <p className="mb-4">
            Share your expertise and guide someone on their journey. Help others grow and succeed!
          </p>
          <a href="/mentor/:id" className="text-green-600 font-semibold hover:underline">Become a Mentor</a>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">For Mentees</h2>
          <p className="mb-4">
            Find a mentor who can help you achieve your goals. Learn and grow with personalized guidance.
          </p>
          <a href="/mentors" className="text-green-600 font-semibold hover:underline">Find a Mentor</a>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
          <p className="mb-4">
            Sign up today to start connecting and collaborating with mentors and mentees.
          </p>
          <a href="/register" className="text-green-600 font-semibold hover:underline">Join Now</a>
        </div>
      </div>
      <TypewriterEffect /> 
    </div>
  );
};

export default Homepage;
