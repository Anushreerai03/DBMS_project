import React, { useState } from 'react';
import axios from 'axios';

const ClassroomForm = () => {

  const [formaData,setFormadata] = useState({
    classNumber:"",
    capacity:""
  })

  console.log(formaData)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormadata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async() => {
    
   await axios.post('http://localhost:4000/api/classroom/classrooms',formaData)
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
      <input type="text" name="classNumber" value={formaData.classNumber} onChange={handleInputChange} placeholder="Class Number" />
      <input type="text"  name="capacity" value={formaData.capacity} onChange={handleInputChange} placeholder="Capacity" />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ClassroomForm;
