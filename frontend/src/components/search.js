import React, { useState } from 'react';

function Search() {
  const [usn, setUSN] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    fetch(`http://localhost:4000/api/seating/seating-details/${usn}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResult(data);
        setError('');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('Error fetching data. Please try again later.');
      });
  };

  return (
<div className="flex justify-center items-center h-screen bg-sage-gray">
  <div className="bg-teal-600 rounded-lg shadow-lg p-10 flex flex-col">
  <h2 className="text-3xl font-bold mb-8 text-black">Seating Arrangement Search</h2>
  <div className="mb-4 flex justify-center">
  <input
    type="text"
    value={usn}
    onChange={e => setUSN(e.target.value)}
    placeholder="Enter USN..."
    className="px-6 py-3 rounded-lg border border-gray-300"
    style={{ width: '300px' }}
  />
</div>

    <div className="mb-4 flex justify-center">
      <button onClick={handleSearch} className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600">Search</button>
    </div>

    {error && <p className="text-red-500 mb-4">{error}</p>}
    {result && (
      <div>
        <p className="text-white">Class Number: {result.class_number}</p>
        <p className="text-white">Row Position: {result.row_position}</p>
      </div>
    )}
  </div>
</div>

  




  

  );
}

export default Search;
