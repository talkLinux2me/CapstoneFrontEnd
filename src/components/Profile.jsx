import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id, userType } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/user`);
        if (!response.ok) throw new Error(`${userType.charAt(0).toUpperCase() + userType.slice(1)} profile not found`);
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, userType]);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return <div className="loader">Loading...</div>; // Replace with a spinner component if needed
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{profileData.name}'s Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="mb-2"><strong>Name:</strong> {profileData.name}</p>
        <p className="mb-2"><strong>Email:</strong> {profileData.email}</p>
        <p className="mb-4"><strong>Role:</strong> {userType.charAt(0).toUpperCase() + userType.slice(1)}</p>

        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="mb-4">{profileData.aboutMe}</p>

        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="mb-2"><strong>Phone:</strong> {profileData.phone}</p>
        <p>
          <strong>LinkedIn:</strong> 
          <a href={profileData.linkedin} className="text-blue-500"> {profileData.linkedin}</a>
        </p>
        
        {userType === 'mentor' && (
          <>
            <h2 className="text-xl font-semibold mt-4">Expertise</h2>
            <ul className="list-disc pl-5">
              {profileData.expertise.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {userType === 'mentee' && (
          <>
            <h2 className="text-xl font-semibold mt-4">Interests</h2>
            <ul className="list-disc pl-5">
              {profileData.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-6">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => window.location.href = `mailto:${profileData.email}`}
          >
            Contact {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
//         <p className="mb-2"><strong>Name:</strong> Alvario Doe</p>
//         <p className="mb-2"><strong>Email:</strong> aveiring.doe@example.com</p>
//         <p className="mb-4"><strong>Role:</strong> Mentor</p>

//         <h2 className="text-xl font-semibold mb-2">About Me</h2>
//         <p className="mb-4">
//           I am passionate about helping others succeed and sharing my knowledge in the field of technology. 
//           I enjoy mentoring individuals who are eager to learn and grow. 
//         </p>

//         <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
//         <p className="mb-2"><strong>Phone:</strong> (718) 804-3138</p>
//         <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/johndoe" className="text-blue-500">linkedin.com/in/johndoe</a></p>
//       </div>
//     </div>
//   );
// };

// export default Profile;
