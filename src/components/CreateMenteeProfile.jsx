import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const CreateMenteeProfile = () => {
  const navigate = useNavigate();
  const [menteeData, setMenteeData] = useState({
    location: '',
     interests: [],
    skills: [],
    personalStatement: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  let menteeID = localStorage.getItem("userID");
  useEffect(() => {
    let menteeID = localStorage.getItem("userID");
    const fetchMenteeData = async () => {
      try {

   

        const response = await fetch(`http://localhost:8081/user/${menteeID}`);
        if (!response.ok) throw new Error('Mentee profile not found');
        const data = await response.json();
        setMenteeData(data);
        setIsEditing(true); // Set editing mode if data is fetched
        console.log(menteeData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (menteeID) {
      fetchMenteeData();
    } else {
      setLoading(false); // If there's no ID, skip loading
    }
  }, [menteeID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenteeData({
      ...menteeData,
      [name]: value,
    });

  
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setMenteeData((prevData) => ({
      ...prevData,
      [name]: value.split(',').map((item) => item.trim()), // Split input into an array
    }));
  };

  

  const handleFileChange = (e) => {
    setMenteeData({
      ...menteeData,
      profilePic: e.target.files[0], // Store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a plain object to send as JSON
    const payload = {
        ...menteeData,
        interests: menteeData.interests, // Keep as array
        skills: menteeData.skills, // Keep as array
    };

    console.log(payload, "payload data"); // Log the payload to check its structure

    try {
        const response = await axios.put(`http://localhost:8081/user/edit/${menteeID}`, payload, {
            headers: {
                'Content-Type': 'application/json' // Set content type to application/json
            }
        });

        if (response.status !== 200) throw new Error('Profile update failed');

        const data = response.data; // Get the updated data
        setMenteeData(data);
    } catch (err) {
        setError(err.message);
    }
};


 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Mentee Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
     
       
        {/* <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700">Profile Picture (optional)</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <select
            id="location"
            name="location"
            value={menteeData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="interests" className="block text-gray-700">Interests (comma-separated)</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={menteeData.interests ? menteeData.interests.join(', ') : ''}
          
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700">Tech Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={menteeData.skills ? menteeData.skills.join(', ') : ''}
        
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="personalStatement" className="block text-gray-700">
            Personal Statement 
          </label>
          <textarea
            id="personalStatement"
            name="personalStatement"
            value={menteeData.personalStatement}
            onChange={handleChange}
            required
            placeholder="Write your personal statement here in your preferred coding language ..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700"
        >
          {isEditing ? "Update Profile" : "Create Profile"}
        </button>
      </form>
      <div className="mt-6">
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateMenteeProfile;
