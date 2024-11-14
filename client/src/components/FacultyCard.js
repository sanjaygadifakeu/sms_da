import React from 'react';
import './FacultyCard.css';

const FacultyCard = ({ faculty, editFaculty, deleteFaculty }) => (
  <div className="faculty-card">
    <h3>{faculty.name}</h3>
    <p>Age: {faculty.age}</p>
    <p>Salary: ${faculty.salary}</p>
    <p>Designation: {faculty.designation}</p>
    <div className="actions">
      <button onClick={() => editFaculty(faculty)}>Edit</button>
      <button onClick={() => deleteFaculty(faculty.id)}>Delete</button>
    </div>
  </div>
);

export default FacultyCard;
