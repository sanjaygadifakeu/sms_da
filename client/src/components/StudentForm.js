import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ addStudent, editingStudent }) => {
  const [student, setStudent] = useState({ name: '', age: '', grade: '' });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(student);
    setStudent({ name: '', age: '', grade: '' });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="age"
        value={student.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        type="text"
        name="grade"
        value={student.grade}
        onChange={handleChange}
        placeholder="Grade"
        required
      />
      <button type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
    </form>
  );
};

export default StudentForm;