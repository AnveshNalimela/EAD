import React, { useEffect, useState } from "react";
import "./App.css"; // Import the stylesheet

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState(160122737000);
  const [isPassed, setIsPassed] = useState(false);

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/students/");
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error while fetching the data: " + error);
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (name) {
      setStudents([...students, { id: Date.now(), name }]);
      setName("");
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleUpdateStudent = (id) => {
    const updatedName = prompt("Enter new name:");
    if (updatedName) {
      setStudents(
        students.map((student) =>
          student.id === id ? { ...student, name: updatedName } : student
        )
      );
    }
  };

  useEffect(() => {
    getStudents();
  }, []); // Added dependency array to prevent infinite calls

  return (
    <div>
      <header>
        <h1>Student Management System</h1>
      </header>
      <div className="main-container">
        <div className="form-container">
          <h2>Add Student</h2>
          <form onSubmit={handleAddStudent}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
            />
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Roll No"
            />
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isPassed}
                  onChange={(e) => setIsPassed(e.target.checked)}
                />
                Pass
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={!isPassed}
                  onChange={(e) => setIsPassed(!e.target.checked)}
                />
                Failed
              </label>
            </div>
            <button type="submit">Add Student</button>
          </form>
        </div>

        <div className="list-container">
          <h2>Student List</h2>
          {students.length === 0 ? (
            <p>No students available.</p>
          ) : (
            students.map((student) => (
              <div key={student._id} className="student-item">
                <div>
                  <h3>{student.name}</h3>
                  <p>{student.rollNo}</p>
                  <p>{student.isPassed}?Passed:Failed</p>
                </div>
                <span>{student.name}</span>
                <div>
                  <button onClick={() => handleUpdateStudent(student.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
