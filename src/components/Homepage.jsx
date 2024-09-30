import React from 'react';
import TypewriterEffect from './TypewriterEffect'; 

const Homepage = () => {
  return (
    <div className="backdrop-blur-background min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">Welcome to Tech Mentor Mentee Match</h1>
      <p className="text-lg text-center mb-6 text-[#571f4e] font-semibold hover:underline">
        Connect with experienced mentors or find eager mentees to share knowledge and skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#4f759b] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2 text-center text-white">For Mentors</h2>
          <p className="mb-4 text-gray-300">
            Share your expertise and guide someone on their journey. Help others grow and succeed!
          </p>
          <div className="flex justify-center">
  <a href="/mentees" className="text-[#571f4e] font-semibold hover:underline">
    Find a Mentee
  </a>
</div>

        </div>
        <div className="bg-[#4f759b] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2  text-center text-white">For Mentees</h2>
          <p className="mb-4 text-gray-300">
            Find a mentor who can help you achieve your goals. Learn and grow with tailored guidance.
          </p>
          <div className="flex justify-center">
  <a href="/mentors" className="text-[#571f4e] font-semibold hover:underline text-center">
    Find a Mentor
  </a>
</div>

        </div>
        <div className="bg-[#4f759b] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2 text-center text-white">Get Started</h2>
          <p className="mb-4 text-gray-300">
            Sign up today to start connecting and collaborating with mentors and mentees.
          </p>
          <div className="flex justify-center">
  <a href="/register" className="text-[#571f4e] font-semibold hover:underline">
    Join Now
  </a>
</div>

        </div>
      </div>
      <TypewriterEffect /> 
    </div>
  );
};

export default Homepage;
