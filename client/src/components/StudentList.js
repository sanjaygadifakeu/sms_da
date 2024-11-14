import React from 'react';
import StudentCard from './StudentCard';
import './StudentList.css';

const StudentList = ({ students, editStudent, deleteStudent }) => (
  <div className="student-list">
    {students.map((student) => (
      <StudentCard
        key={student.id}
        student={student}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />
    ))}
  </div>
);

export default StudentList;