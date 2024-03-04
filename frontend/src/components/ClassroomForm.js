import React, { useState } from 'react';
import axios from 'axios';

const ClassroomForm = () => {
  const [classNumber, setClassNumber] = useState('');

  const handleSave = () => {
    axios.post('http://localhost:3000/api/classrooms', { Class_Number: classNumber })
      .then(response => {
        console.log(response.data);
        // Add any success message or redirect to next page
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div>
      <input type="text" value={classNumber} onChange={(e) => setClassNumber(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ClassroomForm;
