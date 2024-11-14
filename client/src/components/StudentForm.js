import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import './StudentForm.css';

const StudentForm = ({ editingStudent }) => {
  const [student, setStudent] = useState({ name: '', age: '', grade: '' });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
    fetchStudents(); // Fetch students from the database on load
  }, [editingStudent]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/students');
      const data = await response.json();
      setStudents(data); // Update the student list
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (response.ok) {
        const newStudent = await response.json();
        setStudent({ name: '', age: '', grade: '' });
        setStudents((prevStudents) => [...prevStudents, newStudent]); // Update state to show new student in the list immediately
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
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

      <div className="student-list">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentForm;
