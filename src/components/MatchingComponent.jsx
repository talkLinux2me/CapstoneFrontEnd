import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchingComponent = () => {
    const [mentees, setMentees] = useState([]);
    const [selectedMentee, setSelectedMentee] = useState("");
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Fetch the list of mentees on component mount
        const fetchMentees = async () => {
            try {
                const response = await axios.get("/user/users"); // Adjust the URL as needed
                setMentees(response.data);
            } catch (error) {
                console.error("Error fetching mentees:", error);
            }
        };

        fetchMentees();
    }, []);

    const handleMenteeChange = (event) => {
        setSelectedMentee(event.target.value);
    };

    const handleMatch = async () => {
        if (!selectedMentee) return;

        try {
            const response = await axios.get(`/user/${selectedMentee}/matches`);
            setMatches(response.data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    return (
        <div className="my-6">
            <select
                className="border rounded p-2 mb-4"
                value={selectedMentee}
                onChange={handleMenteeChange}
            >
                <option value="">Select a Mentee</option>
                {mentees.map((mentee) => (
                    <option key={mentee.name} value={mentee.name}>
                        {mentee.name}
                    </option>
                ))}
            </select>
            <button
                onClick={handleMatch}
                className="bg-blue-500 text-white rounded p-2"
            >
                Find Matches
            </button>

            <div className="mt-4">
                {matches.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {matches.map((match) => (
                            <li key={match.name}>{match.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No matches found.</p>
                )}
            </div>
        </div>
    );
};

export default MatchingComponent;
