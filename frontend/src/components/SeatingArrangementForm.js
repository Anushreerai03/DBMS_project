// import React, { useState } from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function SeatingArrangementForm() {
    const [classroomNumber, setClassroomNumber] = useState('');
    const [rightRow, setRightRow] = useState({ from: '', to: '' });
    const [middleRow, setMiddleRow] = useState({ from: '', to: '' });
    const [leftRow, setLeftRow] = useState({ from: '', to: '' });

    const handleClassroomNumberChange = (event) => {
        setClassroomNumber(event.target.value);
    };

    const handleRightRowChange = (event) => {
        const { name, value } = event.target;
        setRightRow(prevState => ({ ...prevState, [name]: value }));
    };

    const handleMiddleRowChange = (event) => {
        const { name, value } = event.target;
        setMiddleRow(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLeftRowChange = (event) => {
        const { name, value } = event.target;
        setLeftRow(prevState => ({ ...prevState, [name]: value }));
    };
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
      handleGet();
    }, []); // This ensures that handleGet is called only once when the component mounts
  
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
            const response = await axios.post('http://localhost:4000/api/seating/arrangements', {
                classroomNumber,
                rightRow,
                middleRow,
                leftRow
            });
            console.log("Seating arrangements submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting seating arrangements:", error);
        }
    };

    return (
        <div>
            <h2>Enter Seating Arrangements</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Classroom Number:</label>
                    <select value={classroomNumber} onChange={handleClassroomNumberChange} name="selectedClassroom">
                    <option value="">Select Classroom</option>
                        {classrooms.map((classroom, index) => (
                            <option key={index} value={classroom}>{classroom}</option>
                        ))}
                    </select>

                </div>
                <div>
                    <label>Right Row: </label>
                    <input type="text" name="from" value={rightRow.from} onChange={handleRightRowChange} placeholder="From Student ID" />
                    <input type="text" name="to" value={rightRow.to} onChange={handleRightRowChange} placeholder="To Student ID" />
                </div>
                <div>
                    <label>Middle Row: </label>
                    <input type="text" name="from" value={middleRow.from} onChange={handleMiddleRowChange} placeholder="From Student ID" />
                    <input type="text" name="to" value={middleRow.to} onChange={handleMiddleRowChange} placeholder="To Student ID" />
                </div>
                <div>
                    <label>Left Row: </label>
                    <input type="text" name="from" value={leftRow.from} onChange={handleLeftRowChange} placeholder="From Student ID" />
                    <input type="text" name="to" value={leftRow.to} onChange={handleLeftRowChange} placeholder="To Student ID" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SeatingArrangementForm;
