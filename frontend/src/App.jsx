import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClassroomForm from './components/ClassroomForm';
import BenchesForm from './components/BenchesForm';
import SeatingArrangementForm from './components/SeatingArrangementForm';
import FacultyForm from './components/FacultyForm';

const App = () => {
  return (
    <Router>
      <Route exact path="/classroom" component={ClassroomForm} />
      <Route exact path="/benches" component={BenchesForm} />
      <Route exact path="/seating-arrangement" component={SeatingArrangementForm} />
      <Route exact path="/faculty" component={FacultyForm} />
    </Router>
  );
};

export default App;
