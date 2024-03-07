import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BenchesForm = () => {
  const [benchData, setBenchData] = useState({
    classrooms: [], 
    selectedClassroom: "",
    left: "",
    center: "",
    right: ""
  });

  const handleGet = () => {
    axios.get('http://localhost:4000/api/getclassNumbers')
      .then(response => {
        setBenchData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBenchData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    await axios.post('http://localhost:4000/api/createbenches', benchData)
      .then(response => {
        console.log(response.data);
        // Add any success message or redirect to the next page
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div>
      <select value={benchData.selectedClassroom} onChange={handleInputChange} name="selectedClassroom">
        <option value="">Select Classroom</option>
        {benchData.classrooms.map(classroom => (
          <option key={classroom.id} value={classroom.id}>{classroom.class_number}</option>
        ))}
      </select>
      <input type="text" name="left" value={benchData.left} onChange={handleInputChange} />
      <input type="text" name="center" value={benchData.center} onChange={handleInputChange} />
      <input type="text" name="right" value={benchData.right} onChange={handleInputChange} />
      <button onClick={handleSave}>Enter</button>
    </div>
  );
};

export default BenchesForm;
