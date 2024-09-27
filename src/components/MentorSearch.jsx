import React, { useEffect, useState } from 'react';

const MentorSearch = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [meetingType, setMeetingType] = useState({
    virtual: false,
    inPerson: false,
  });
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:8081/user/mentors');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMentors(data);
        setFilteredMentors(data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const filterMentors = () => {
      const filtered = mentors.filter((mentor) => {
        const matchesSearchTerm = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExpertise = expertiseFilter ? mentor.expertise.includes(expertiseFilter) : true;
        const matchesExperience = experienceFilter ? mentor.yearsOfExperience >= Number(experienceFilter) : true;
        const matchesAvailability = availabilityFilter ? mentor.availability.includes(availabilityFilter) : true;
        const matchesMeetingType =
          (meetingType.virtual && mentor.meetingType === 'virtual') ||
          (meetingType.inPerson && mentor.meetingType === 'in-person') ||
          (!meetingType.virtual && !meetingType.inPerson);

        return matchesSearchTerm && matchesExpertise && matchesExperience && matchesAvailability && matchesMeetingType;
      });
      setFilteredMentors(filtered);
      setHasSearched(true);
    };

    filterMentors();
  }, [searchTerm, expertiseFilter, experienceFilter, availabilityFilter, meetingType, mentors]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Find a Mentor</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <select
          value={expertiseFilter}
          onChange={(e) => setExpertiseFilter(e.target.value)}
          className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by expertise</option>
          {/* Add expertise options dynamically */}
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Minimum years of experience"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Meeting Type</h2>
        <div className="flex items-center">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={meetingType.virtual}
              onChange={(e) => setMeetingType({ ...meetingType, virtual: e.target.checked })}
              className="mr-2 h-4 w-4"
            />
            <span>Virtual</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meetingType.inPerson}
              onChange={(e) => setMeetingType({ ...meetingType, inPerson: e.target.checked })}
              className="mr-2 h-4 w-4"
            />
            <span>In-Person</span>
          </label>
        </div>
      </div>

      <button
        onClick={() => setHasSearched(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        Apply Filters
      </button>

      <ul className="list-disc pl-5 mt-6">
        {hasSearched && filteredMentors.length === 0 ? (
          <li>No mentors found</li>
        ) : (
          filteredMentors.map((mentor) => (
            <li key={mentor.id} className="mb-2">
              <a href={`/mentor/${mentor.id}`} className="text-blue-500 hover:underline">
                {mentor.name} - {mentor.expertise.join(', ')} ({mentor.yearsOfExperience} years)
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MentorSearch;
