import React from 'react';
import FacultyCard from './FacultyCard';
import './FacultyList.css';

const FacultyList = ({ faculties, editFaculty, deleteFaculty }) => (
  <div className="faculty-list">
    {faculties.map((faculty) => (
      <FacultyCard
        key={faculty.id}
        faculty={faculty}
        editFaculty={editFaculty}
        deleteFaculty={deleteFaculty}
      />
    ))}
  </div>
);

export default FacultyList;
