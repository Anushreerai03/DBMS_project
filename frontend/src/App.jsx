import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ClassroomForm from './components/ClassroomForm';
import BenchesForm from './components/BenchesForm';
import SeatingArrangementForm from './components/SeatingArrangementForm';
import FacultyForm from './components/FacultyForm';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/classroom" element={<ClassroomForm/>} />
      <Route path="/benches" element={<BenchesForm/>} />
      <Route path="/seating-arrangement" element={<SeatingArrangementForm/>} />
      <Route path="/faculty" element={<FacultyForm/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
