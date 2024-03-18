import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassroomForm = () => {
  const handleSuccess = (msg) => {
    toast.success(msg, { position: 'top-right' });
  };

  const handleError = (msg) => {
    toast.error(msg, { position: 'bottom-left' });
  };

  const [formData, setFormData] = useState({
    classNumber: "",
    capacity: ""
  });

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/classroom/classrooms');
        setClassrooms(response.data.data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/classroom/classrooms', formData);
      if (response.data.status === 201) {
        const updatedResponse = await axios.get('http://localhost:4000/api/classroom/classrooms');
        setClassrooms(updatedResponse.data);
        handleSuccess("Added Successfully");
      } else {
        handleError("Cannot add this data");
      }
    } catch (error) {
      console.error('Error saving classroom:', error);
    }
  };

  const handleDelete = async (classNumber) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/classroom/classrooms/${classNumber}`);
      if (response.status === 200) {
        handleSuccess("Deleted Successfully");
        const updatedClassrooms = classrooms.filter(classroom => classroom.class_number !== classNumber);
        setClassrooms(updatedClassrooms);
      } else {
        handleError("Failed to delete classroom");
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  return (
    <>
    <div className="flex justify-between h-screen bg-sage-gray">
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="bg-teal-600 rounded-lg shadow-lg p-6">
          <h1 className='text-black text-3xl mb-4'>Enter Classroom Details</h1>
          <form className="flex flex-col space-y-4">
            <input type="text" name="classNumber" value={formData.classNumber} onChange={handleInputChange} placeholder="Class Number" className='px-4 py-2' />
            <input type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="Capacity" className='px-4 py-2' />
            <button onClick={handleSave} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600">Save</button>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="mt-4">
          <h2 className="text-black font-bold text-2xl mb-2">Classrooms</h2>
          <table className="border-collapse border-2 border-gray-400">
            <thead>
              <tr className="bg-teal-600">
                <th className="border-2 border-gray-400 px-4 py-2">Class Number</th>
                <th className="border-2 border-gray-400 px-4 py-2">Capacity</th>
                <th className="border-2 border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(classrooms) && classrooms.map(classroom => (
                <tr key={classroom.class_number} className="bg-gray-100">
                  <td className="border-2 border-gray-400 px-4 py-2">{classroom.class_number}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">{classroom.capacity}</td>
                  <td className="border-2 border-gray-400 px-4 py-2">
                    <button onClick={() => handleDelete(classroom.class_number)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default ClassroomForm;
