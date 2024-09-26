import React, { useState, useEffect } from 'react';

function MenteeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state variables for additional filters
  const [locationFilter, setLocationFilter] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');
  const [meetingTypeFilter, setMeetingTypeFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Fetch mentees from the API
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await fetch('http://localhost:8081/users'); // Ensure this matches your API endpoint
        if (!response.ok) throw new Error('Failed to fetch mentees');
        const data = await response.json();
        setMentees(data);
        setFilteredMentees(data); // Display all mentees initially
      } catch (error) {
        console.error('Error fetching mentees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  // Filter mentees based on search term and additional filters
  const applyFilters = () => {
    const filtered = mentees.filter(mentee => {
      const matchesSearchTerm = mentee.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter ? mentee.location.toLowerCase() === locationFilter.toLowerCase() : true;
      const matchesExpertise = expertiseFilter ? mentee.expertise.includes(expertiseFilter) : true;
      const matchesMeetingType = meetingTypeFilter ? mentee.meetingType === meetingTypeFilter : true;
      const matchesAvailability = availabilityFilter ? mentee.availability.includes(availabilityFilter) : true;

      return matchesSearchTerm && matchesLocation && matchesExpertise && matchesMeetingType && matchesAvailability;
    });
    setFilteredMentees(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocationFilter('');
    setExpertiseFilter('');
    setMeetingTypeFilter('');
    setAvailabilityFilter('');
    setFilteredMentees(mentees); // Reset to show all mentees
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search for Mentees by name:</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded w-1/3 p-2 mr-2" // Shortened width
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white rounded px-4 mr-2 hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 rounded px-4"
        >
          Reset
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Or filter Mentees by:</h2>

        {/* Location Filter */}
        <div className="mb-2">
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="">Filter by State</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            {/* Add more states as needed */}
          </select>
        </div>

        {/* Expertise Filter */}
        <div className="mb-2">
          <select
            value={expertiseFilter}
            onChange={e => setExpertiseFilter(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="">Filter by expertise</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="SQL">SQL</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Meeting Type Filter */}
        <div className="mb-2">
          <select
            value={meetingTypeFilter}
            onChange={e => setMeetingTypeFilter(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="">Filter by meeting type</option>
            <option value="virtual">Virtual</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="mb-2">
          <select
            value={availabilityFilter}
            onChange={e => setAvailabilityFilter(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="">Filter by availability</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white rounded px-4 hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredMentees.length === 0 ? (
        <p>No mentees found.</p>
      ) : (
        <ul>
          {filteredMentees.map(mentee => (
            <li key={mentee.id} className="flex justify-between items-center border-b py-2">
              <div>
                <span className="font-semibold">{mentee.name}</span> - {mentee.expertise.join(', ')} ({mentee.yearsOfExperience} years)
                <p className="text-sm text-gray-600">{mentee.availability.join(', ')}</p>
              </div>
              <a
                href={`/mentee/${mentee.id}`} // Link to mentee profile page
                className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
              >
                Learn More
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenteeSearch;
