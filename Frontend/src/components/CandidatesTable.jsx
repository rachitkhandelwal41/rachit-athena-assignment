import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch candidates from backend
    axios.get('http://localhost:3000/api/candidates') 
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  // Filter candidates based on name or skill
  const filteredCandidates = candidates.filter((candidate) => {
    const search = searchTerm.toLowerCase();
    return (
      candidate.Name.toLowerCase().includes(search) || 
      candidate.Skills.some(skill => skill.toLowerCase().includes(search))
    );
  });

  // Sort candidates by years of experience
  const sortCandidates = (candidates) => {
    let sortedCandidates = [...candidates]; // Sort after filtering

    // Sorting by Years of Experience
    if (sortOrder === 'asc') {
      sortedCandidates = sortedCandidates.sort((a, b) => a['Years of Experience'] - b['Years of Experience']);
    } else if (sortOrder === 'desc') {
      sortedCandidates = sortedCandidates.sort((a, b) => b['Years of Experience'] - a['Years of Experience']);
    }

    return sortedCandidates;
  };

  // Toggle sorting for years of experience
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedCandidates = sortCandidates(filteredCandidates); 

  return (
    <div className="h-screen bg-gradient-to-br from-teal-900 via-indigo-900 to-black animate-gradient-x">
      <div className="container mx-auto p-8">
        <h1 className="text-center text-5xl font-semibold text-white mb-6">Candidates List</h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by name or skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-80 border-2 border-transparent rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={toggleSortOrder}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Sort by Experience ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white text-gray-900 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-700 to-teal-800 text-white">
              <tr>
                <th className="px-6 py-3 text-center font-semibold">Name</th>
                <th className="px-6 py-3 text-center font-semibold">Skills</th>
                <th className="px-6 py-3 text-center font-semibold">Experience</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.length > 0 ? (
                sortedCandidates.map((candidate, index) => (
                  <tr key={index} className="border-b hover:bg-indigo-100 transition-all duration-300">
                    <td className="px-6 py-3 text-center">{candidate.Name}</td>
                    <td className="px-6 py-3 text-center">{candidate.Skills.join(', ')}</td>
                    <td className="px-6 py-3 text-center">{candidate['Years of Experience']}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">No candidates found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
