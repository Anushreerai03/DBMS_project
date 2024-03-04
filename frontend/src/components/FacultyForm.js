import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');

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
    axios.post('http://localhost:3000/api/faculty', { FId: facultyId, FName: facultyName, CId: selectedClassroom })
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
      
      <input type="text" placeholder="Faculty ID" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} />
      <input type="text" placeholder="Faculty Name" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default FacultyForm;
