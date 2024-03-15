import React, { useState } from 'react';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'


const ClassroomForm = () => {

  const handleSuccess=(msg)=>{
    toast.success(msg,
      {
        position:'top-right'
    })
  }

  const handleError=(msg)=>{
    toast.error(msg,{position:'bottom-left'})
  }
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

  const handleSave = async(event) => {
    event.preventDefault();
    const response=await axios.post('http://localhost:4000/api/classroom/classrooms',formaData)

    console.log(response);
    if(response.data.status===200){
      handleSuccess("Added Successfully")
    }else{
      handleError("Classroom number already exists")
    }
  //  await axios.post('http://localhost:4000/api/classroom/classrooms',formaData)
  //     .then(response => {
  //       console.log(response.data);
  //       // Add any success message or redirect to next page
  //     })
  //     .catch(error => {
  //       console.log("This is error");
  //       console.error('Error:', error);
  //       // Handle error
  //     });
  };

  return (
    <>
    <div>
      <form>
      <input type="text" name="classNumber" value={formaData.classNumber} onChange={handleInputChange} placeholder="Class Number" />
      <input type="text"  name="capacity" value={formaData.capacity} onChange={handleInputChange} placeholder="Capacity" />
      <button onClick={handleSave}>Save</button>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default ClassroomForm;
