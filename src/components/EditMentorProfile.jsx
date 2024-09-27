import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const EditMentorProfile = () => {
    const { id } = useParams();
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/mentors/${id}`);
                if (!response.ok) throw new Error('Mentor profile not found');
                const data = await response.json();
                setMentorData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMentorData();
    }, [id]);

    const handleChange = (e) => {
        setMentorData({ ...mentorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/api/mentors/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentorData),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            // Optionally navigate back or show a success message
            window.location.href = `/mentors/${id}`;
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
            <h1 className="text-3xl font-bold mb-4">Edit {mentorData.name}'s Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={mentorData.name}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={mentorData.email}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={mentorData.location}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Interests:</label>
                    <input
                        type="text"
                        name="interests"
                        value={mentorData.interests.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'interests', value: e.target.value.split(', ') } })}
                        className="border rounded p-2 w-full"
                        placeholder="Comma separated"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Skills:</label>
                    <input
                        type="text"
                        name="skills"
                        value={mentorData.skills.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'skills', value: e.target.value.split(', ') } })}
                        className="border rounded p-2 w-full"
                        placeholder="Comma separated"
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditMentorProfile;
