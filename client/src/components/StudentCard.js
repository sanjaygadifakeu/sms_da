import React from 'react';
import './StudentCard.css';

const StudentCard = ({ student, editStudent, deleteStudent }) => (
  <div className="student-card">
    <h3>{student.name}</h3>
    <p>Age: {student.age}</p>
    <p>Grade: {student.grade}</p>
    <div className="actions">
      <button onClick={() => editStudent(student)}>Edit</button>
      <button onClick={() => deleteStudent(student.id)}>Delete</button>
    </div>
  </div>
);

export default StudentCard;