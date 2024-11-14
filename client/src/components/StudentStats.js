import React from 'react';
import './StudentStats.css';

const StudentStats = ({ students }) => {
  const totalStudents = students.length;

  return (
    <div className="student-stats">
      <p>Total Students: {totalStudents}</p>
    </div>
  );
};

export default StudentStats;