// import React, { useState } from 'react';
// import axios from 'axios';
// import {ToastContainer,toast} from 'react-toastify'


// const ClassroomForm = () => {

//   const handleSuccess=(msg)=>{
//     toast.success(msg,
//       {
//         position:'top-right'
//     })
//   }

//   const handleError=(msg)=>{
//     toast.error(msg,{position:'bottom-left'})
//   }
//   const [formaData,setFormadata] = useState({
//     classNumber:"",
//     capacity:""
//   })

//   console.log(formaData)
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormadata(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSave = async(event) => {
//     event.preventDefault();
//     const response=await axios.post('http://localhost:4000/api/classroom/classrooms',formaData)

//     console.log("response is:",response.data);
//     if(response.data.status===201){
//       setTimeout(()=>{
//         handleSuccess("Added Successfully")
//       },1000)
      
//     }else{
//       setTimeout(()=>{
//         handleError("Classroom number already exists")
//       },1000)

//       const response =  axios.get('http://localhost:4000/api/classroom/classrooms')
//       console.log("response is:",response.data);

      
//     }
//   //  await axios.post('http://localhost:4000/api/classroom/classrooms',formaData)
//   //     .then(response => {
//   //       console.log(response.data);
//   //       // Add any success message or redirect to next page
//   //     })
//   //     .catch(error => {
//   //       console.log("This is error");
//   //       console.error('Error:', error);
//   //       // Handle error
//   //     });
//   };

//   return (
//     <>
//     <div>
//       <form>
//       <input type="text" name="classNumber" value={formaData.classNumber} onChange={handleInputChange} placeholder="Class Number" />
//       <input type="text"  name="capacity" value={formaData.capacity} onChange={handleInputChange} placeholder="Capacity" />
//       <button onClick={handleSave}>Save</button>
//       </form>
//       {/* <ToastContainer /> */}
//     </div>

//     </>
//   );
// };

// export default ClassroomForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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

  const [classrooms, setClassrooms] = useState([]); // Initialize as an empty array

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
  }, []); // Empty dependency array to trigger data fetching only once when the component mounts

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
      if (response.status === 201) {
        handleSuccess("Added Successfully");
        // Fetch updated classrooms data after successful save
        const updatedResponse = await axios.get('http://localhost:4000/api/classroom/classrooms');
        setClassrooms(updatedResponse.data);
      } else {
        handleError("Classroom number already exists");
      }
    } catch (error) {
      console.error('Error saving classroom:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1 className='bg-red-500'>Classroom</h1>
      <form>
        <input type="text" name="classNumber" value={formData.classNumber} onChange={handleInputChange} placeholder="Class Number" className='border-amber-800 border-4'/>
        <input type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="Capacity" />
        <button onClick={handleSave}>Save</button>
      </form>
      <div>
        <h2>Classrooms</h2>
        <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black', padding: '8px' }}>Class Number</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Capacity</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(classrooms) && classrooms.map(classroom => (
        <tr key={classroom.class_number}>
          <td style={{ border: '1px solid black', padding: '8px' }}>{classroom.class_number}</td>
          <td style={{ border: '1px solid black', padding: '8px' }}>{classroom.capacity}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
      
    </div>
  );
};

export default ClassroomForm;


