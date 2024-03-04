import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BenchesForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [left, setLeft] = useState('');
  const [center, setCenter] = useState('');
  const [right, setRight] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/classrooms')
      .then(response => {
        setClassrooms(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:3000/api/benches', { Left: left, Center: center, Right: right, CId: selectedClassroom })
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
      <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
        <option value="">Select Classroom</option>
        {classrooms.map(classroom => (
          <option key={classroom.id} value={classroom.id}>{classroom.Class_Number}</option>
        ))}
      </select>
      <input type="text" value={left} onChange={(e) => setLeft(e.target.value)} />
      <input type="text" value={center} onChange={(e) => setCenter(e.target.value)} />
      <input type="text" value={right} onChange={(e) => setRight(e.target.value)} />
      <button onClick={handleSave}>Enter</button>
    </div>
  );
};

export default BenchesForm;
