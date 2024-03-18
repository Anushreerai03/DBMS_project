import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyForm = () => {
  const [classroomNumber, setClassroomNumber] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');


  console.log(facultyId);
  console.log(facultyName);

  const handleClassroomNumberChange = (event) => {
    setClassroomNumber(event.target.value);
};


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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/faculty', {
            classroomNumber,
            facultyId,
            facultyName
        });
        console.log("Seating arrangements submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting seating arrangements:", error);
    }
};

  // const handleSave = () => {
  //   axios.post('http://localhost:4000/api/faculty', { FId: facultyId, FName: facultyName, CId: selectedClassroom })
  //     .then(response => {
  //       console.log(response.data);
  //       // Add any success message or redirect to next page
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       // Handle error
  //     });
  // };



  return (
        <div className="flex justify-center items-center h-screen bg-sage-gray">
  <div className="bg-teal-600 rounded-lg shadow-lg p-6">
    <h2 className="mb-4 text-3xl font-bold">Enter Faculty Details</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mr-2 font-bold">Classroom Number:</label>
        <select value={classroomNumber} onChange={handleClassroomNumberChange} name="selectedClassroom" className="px-4 py-2 text-lg rounded-lg">
          <option value="">Select Classroom</option>
          {classrooms.map((classroom, index) => (
            <option key={index} value={classroom}>{classroom}</option>
          ))}
        </select>
      </div>


      <div className="flex justify-center">
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Submit</button>
      </div>
      

      
    </form>
  </div>
</div>


    );





//   return (
//     <div>
//       <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
//         <option value="">Select Classroom</option>
//         {classrooms.map(classroom => (
//           <option key={classroom.id} value={classroom.id}>{classroom.Class_Number}</option>
//         ))}
//       </select>
      
//       <input type="text" placeholder="Faculty ID" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} />
//       <input type="text" placeholder="Faculty Name" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />

//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
};

export default FacultyForm;
