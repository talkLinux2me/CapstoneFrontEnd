import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchResults() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state || [];

  useEffect(() => {
    console.log(results);
    setResult(results);
  }, [results]);

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-white">Search Results</h2>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-[#4f759b] text-white rounded px-4 py-2 mb-4 hover:bg-[#3f6390] transition duration-200 ease-in-out"
        aria-label="Go back to the previous page"
      >
        Back
      </button>

      {result.length === 0 ? (
        <p className="text-white">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-2/3">
          {result.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4 m-2 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-[#4f759b]">{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Years of Experience:</strong> {user.yearsOfExperience}</p>
              <p><strong>Expertise:</strong> {user.expertise.join(', ')}</p>
              <p><strong>Availability:</strong> {user.availability.join(', ')}</p>
              <p><strong>Meeting Type:</strong> {user.meetingType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
