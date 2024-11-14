import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
//import StudentStats from './components/StudentStats';
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import Faculty from './components/Faculty'; // Import the Faculty page
import BulkUpload from './components/BulkUpload'; // Import the BulkUpload page
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load students from local storage on initial render
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Update local storage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...student, id: editingStudent.id } : s
        )
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
  };

  const editStudent = (student) => setEditingStudent(student);

  const deleteStudent = (id) => setStudents(students.filter((s) => s.id !== id));

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="app-container">
        <Header />

        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/faculty">Faculty</Link>
          <Link to="/bulk-upload">Bulk Upload</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Searchbar setSearchQuery={setSearchQuery} />
                <StudentForm addStudent={addStudent} editingStudent={editingStudent} />
                
                

                <StudentList
                  students={filteredStudents}
                  editStudent={editStudent}
                  deleteStudent={deleteStudent}
                />
              </>
            }
          />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
