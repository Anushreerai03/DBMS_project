import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SeatingArrangementForm() {
    const [classroomNumber, setClassroomNumber] = useState('');
    const [rightRow, setRightRow] = useState({ from: '', to: '' });
    const [middleRow, setMiddleRow] = useState({ from: '', to: '' });
    const [leftRow, setLeftRow] = useState({ from: '', to: '' });
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
            toast.error('Failed to fetch class numbers', { position: 'bottom-left' });
        }
    };

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
            toast.success('Seating arrangements submitted successfully', { position: 'top-right' });
        } catch (error) {
            console.error("Error submitting seating arrangements:", error);
            toast.error('Failed to submit seating arrangements', { position: 'bottom-left' });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-sage-gray">
            <div className="bg-teal-600 rounded-lg shadow-lg p-6">
                <h2 className="mb-4 text-3xl font-bold">Enter Seating Arrangements</h2>
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

                    <div className="mb-4">
                        <label className="mr-2 font-bold">Right Row: </label>
                        <input type="text" name="from" value={rightRow.from} onChange={handleRightRowChange} placeholder="From Student ID" className="mr-2 px-4 py-2 rounded-lg" />
                        <input type="text" name="to" value={rightRow.to} onChange={handleRightRowChange} placeholder="To Student ID" className="px-4 py-2 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="mr-2 font-bold">Middle Row: </label>
                        <input type="text" name="from" value={middleRow.from} onChange={handleMiddleRowChange} placeholder="From Student ID" className="mr-2 px-4 py-2 rounded-lg" />
                        <input type="text" name="to" value={middleRow.to} onChange={handleMiddleRowChange} placeholder="To Student ID" className="px-4 py-2 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="mr-2 font-bold">Left Row: </label>
                        <input type="text" name="from" value={leftRow.from} onChange={handleLeftRowChange} placeholder="From Student ID" className="mr-2 px-4 py-2 rounded-lg" />
                        <input type="text" name="to" value={leftRow.to} onChange={handleLeftRowChange} placeholder="To Student ID" className="px-4 py-2 rounded-lg" />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SeatingArrangementForm;
