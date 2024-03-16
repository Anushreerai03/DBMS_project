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
    <div>
      <h2>Seating Arrangement Search</h2>
      <input
        type="text"
        value={usn}
        onChange={e => setUSN(e.target.value)}
        placeholder="Enter USN..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <p>Class Number: {result.class_number}</p>
          <p>Row Position: {result.row_position}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
