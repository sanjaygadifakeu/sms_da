import React, { useState, useEffect } from 'react';
import './Faculty.css';

const Faculty = ({ addFaculty, editingFaculty }) => {
  const [faculty, setFaculty] = useState({ name: '', department: '', designation: '' });

  useEffect(() => {
    if (editingFaculty) {
      setFaculty(editingFaculty);
    }
  }, [editingFaculty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFaculty(faculty);
    setFaculty({ name: '', department: '', designation: '' });
  };

  return (
    <form className="faculty-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={faculty.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="department"
        value={faculty.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <input
        type="text"
        name="designation"
        value={faculty.designation}
        onChange={handleChange}
        placeholder="Designation"
        required
      />
      <button type="submit">{editingFaculty ? 'Update' : 'Add'} Faculty</button>
    </form>
  );
};

export default Faculty;
