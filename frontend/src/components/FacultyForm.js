import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FacultyForm = () => {
  const [facultyData, setFacultyData] = useState({
    selectedClassroom: "",
    facultyId: "",
    facultyName: ""
  });

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/benches/getclassNumbers');
      const classNumbers = response.data;
      setClassrooms(classNumbers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:4000/api/faculty/createfaculty', facultyData);
      toast.success('Faculty data saved successfully', { position: 'top-right' });
      console.log("Faculty data saved successfully");
      // Add any success message or redirect to the next page
    } catch (error) {
      console.error('Error saving faculty data:', error);
      toast.error('Failed to save faculty data', { position: 'bottom-left' });
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sage-gray">
      <div className="bg-teal-600 rounded-lg shadow-lg p-20 flex flex-col">
        <h2 className="mb-4 text-3xl font-bold">Enter Faculty Details</h2>

        <div className="mb-4">
          <label className="mr-2 font-bold">Classroom Number:</label>
          <select
            value={facultyData.selectedClassroom}
            onChange={handleInputChange}
            name="selectedClassroom"
            className="mb-4 px-4 py-2 text-lg rounded border border-gray-300"
          >
            <option value="">Select Classroom</option>
            {classrooms.map((classroom, index) => (
              <option key={index} value={classroom}>{classroom}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mr-2 font-bold">Faculty ID:</label>
          <input
            type="text"
            name="facultyId"
            value={facultyData.facultyId}
            onChange={handleInputChange}
            className="mb-2 border border-gray-300 rounded-lg px-12 py-2"
            placeholder="Faculty ID"
          />
        </div>

        <div className="mb-4">
          <label className="mr-2 font-bold">Faculty Name:</label>
          <input
            type="text"
            name="facultyName"
            value={facultyData.facultyName}
            onChange={handleInputChange}
            className="mb-2 border border-gray-300 rounded-lg px-12 py-2"
            placeholder="Faculty Name"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Enter
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FacultyForm;
