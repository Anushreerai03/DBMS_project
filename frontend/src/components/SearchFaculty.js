import React, { useState } from 'react';

function SearchFaculty() {
  const [classNumberInput, setClassNumberInput] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    fetch(`http://localhost:4000/api/faculty/class-number/${classNumberInput}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data. Please try again later.');
        }
        return response.json();
      })
      .then(data => {
        setClassNumber(data);
        setError('');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch data. Please try again later.');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sage-gray">
      <div className="bg-teal-600 rounded-lg shadow-lg p-10 flex flex-col">
        <h2 className="text-3xl font-bold mb-8 text-black">Faculty Details Search</h2>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={classNumberInput}
            onChange={e => setClassNumberInput(e.target.value)}
            placeholder="Enter Faculty ID or Name..."
            className="px-6 py-3 rounded-lg border border-gray-300"
            style={{ width: '300px' }}
          />
        </div>

        <div className="mb-4 flex justify-center">
          <button onClick={handleSearch} className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600">Search</button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {classNumber && <p className="text-white">Class Number: {classNumber.class_number}</p>}
      </div>
    </div>
  );
}

export default SearchFaculty;
