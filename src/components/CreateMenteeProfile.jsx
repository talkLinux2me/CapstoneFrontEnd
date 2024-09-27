import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [menteeData, setMenteeData] = useState({
    name: '',
    email: '',
    location: '',
    interests: [],
    skills: [],
    personalStatement: '',
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/mentees/${id}`);
        if (!response.ok) throw new Error('Mentee profile not found');
        const data = await response.json();
        setMenteeData(data);
        setIsEditing(true); // Set editing mode if data is fetched
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMenteeData();
    } else {
      setLoading(false); // If there's no ID, skip loading
    }
  }, [id]);

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

    const formData = new FormData();
    Object.entries(menteeData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value)); // Convert array to JSON string
      } else {
        formData.append(key, value);
      }
    });

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(`http://localhost:8081/user/creatementeeprofile"}`, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error('Profile update failed');

      const data = await response.json();
      setMenteeData(data);
      setError(''); // Clear error message on success
      navigate(`/mentee/${data.id}`); // Redirect to the mentee profile after saving
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
      <h1 className="text-3xl font-bold mb-4">{isEditing ? "Edit" : "Create"} Mentee Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menteeData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={menteeData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700">Profile Picture (optional)</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
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
            value={menteeData.interests.join(', ')} // Convert array to string for display
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
            value={menteeData.skills.join(', ')} // Convert array to string for display
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
