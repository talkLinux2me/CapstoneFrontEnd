import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchMakingComponent = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            const mentorId = localStorage.getItem("/mentee/:id"); 
            try {
                const response = await axios.get(`http://localhost:8081//match/${menteeId}`); 
                setMatches(response.data);
            } catch (err) {
                setError('Failed to fetch matches.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Your Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map(match => (
                    <div key={match.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{match.name}</h2>
                        <p><strong>Availability:</strong> {match.availability}</p>
                        <p><strong>Meeting Type:</strong> {match.meetingType}</p>
                        <p><strong>Favorite Coding Language:</strong> {match.codingLanguage}</p>
                    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchMakingComponent;
