import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const CreateMentorProfile = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({
  
    location: '',
    yearsOfExperience: '',
    availability: '',
    certifications: [],
    interests: [],
    meetingType: '',
    personalStatement: '',
    codingLanguage: [],
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  let mentorID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/user/${mentorID}`);
        if (!response.ok) throw new Error('Mentor profile not found');
        const data = await response.json();
        setMentorData(data);
        setIsEditing(true);
        console.log(mentorData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mentorID) {
      fetchMentorData();
    } else {
      setLoading(false);
    }
  }, [mentorID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setMentorData((prevData) => ({
      ...prevData,
      [name]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleFileChange = (e) => {
    setMentorData({
      ...mentorData,
      profilePic:  e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...mentorData,
      interests: mentorData.interests, // Keep as array
      codingLanguage: mentorData.codingLanguage,
      skills: mentorData.skills, 
      certifications: mentorData.certifications,// Keep as array
  };
 
  console.log(payload, "payload data"); // Log the payload to check its structure
 
  try {
    const response = await axios.put(`http://localhost:8081/user/edit/${mentorID}`, payload, {
        headers: {
            'Content-Type': 'application/json' // Set content type to application/json
        }
    });

    if (response.status !== 200) throw new Error('Profile update failed');
    
    const data = response.data; // Get the updated data
    setMentorData(data);
} catch (err) {
    setError(err.message);
}
};

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4"> Mentor Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        
    
        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700">Profile Picture (optional) </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="block text-gray-700">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={mentorData.yearsOfExperience}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <select
            id="location"
            name="location"
            value={mentorData.location}
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
          <label htmlFor="availability" className="block text-gray-700">Availability</label>
          <select
            id="availability"
            name="availability"
            value={mentorData.availability}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select availability</option>
            
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="on-demand">On-Demand</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="meetingType" className="block text-gray-700">Meeting Type</label>
          <select
            id="meetingType"
            name="meetingType"
            value={mentorData.meetingType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select meeting type</option>
            <option value="virtual">Virtual</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="interests" className="block text-gray-700">Interests (comma-separated)</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={mentorData.interests ? mentorData.interests.join(', ') : ''}
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="coding-language" className="block text-gray-700">Coding Languages (comma-separated)</label>
          <input
            type="text"
            id="coding-languages"
            name="coding-languages"
            value={mentorData.codingLanguages ? mentorData.codingLanguages.join(', ') : ''}
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="certifications" className="block text-gray-700">Certifications (comma-separated)</label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            value={mentorData.certifications ? mentorData.certifications.join(', '):''}
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>


       
        <div className="mb-4">
          <label htmlFor="personalStatement" className="block text-gray-700">Personal Statement</label>
          <textarea
            id="personalStatement"
            name="personalStatement"
            value={mentorData.personalStatement}
            onChange={handleChange}
            required
             placeholder="Write your personal statement here. Formatted in your preferred coding language in encouraged ..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows="4"
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

export default CreateMentorProfile;
