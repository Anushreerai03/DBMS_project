import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatingArrangementForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    // Fetch students not assigned to any bench
    axios.get('http://localhost:3000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);

  const handleSave = () => {
    // Assuming you have inputs for assigning students to benches
    // Example: axios.post('http://localhost:3000/api/seatingArrangement', { seat_no: seatNo, Sid: studentId, CId: selectedClassroom })
  };

  return (
    <div>
      <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
        <option value="">Select Classroom</option>
        {classrooms.map(classroom => (
          <option key={classroom.id} value={classroom.id}>{classroom.Class_Number}</option>
        ))}
      </select>

      {/* Render inputs for assigning students to benches */}
      {students.map(student => (
        <div key={student.id}>
          <input type="text" placeholder="Seat No." />
          <select>
            {/* Render options for selecting student */}
            <option value={student.id}>{student.SName}</option>
          </select>
        </div>
      ))}

      <button onClick={handleSave}>Assign Students</button>
    </div>
  );
};

export default SeatingArrangementForm;
