// 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  const userId = localStorage.getItem('userID');
  const userRole = localStorage.getItem('userRole');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${userId}`);
        setProfile({ ...response.data, role: userRole });
        setEditedProfile({ ...response.data, role: userRole });
      } catch (error) {
        toast.error('Failed to fetch profile data');
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/user/${profile.id}`, editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.delete(`http://localhost:8081/user/${profile.id}`);
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        toast.success('Profile deleted successfully');
        // Redirect to home page or login page after deletion
        window.location.href = '/';
      } catch (error) {
        toast.error('Failed to delete profile');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  if (!profile) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-4 sm:p-6">
            <h1 className="text-3xl font-bold text-white">{profile.name}'s Profile</h1>
            <p className="text-blue-200 mt-1">Registered as a {profile.role}</p>
          </div>
          <div className="p-4 sm:p-6">
            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bio"
                    name="bio"
                    rows="3"
                    value={editedProfile.bio || ''}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
                  <p className="text-gray-600 mt-2">{profile.bio || 'No bio available'}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                  <p className="text-gray-600 mt-2">Email: {profile.email}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDelete}
                  >
                    Delete Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;