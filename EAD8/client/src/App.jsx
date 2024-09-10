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
  const addStudent = async (newStudent) => {
    try {
      const response = await fetch("http://localhost:3000/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      const data = await response.json();
      if (data) {
        setStudents([...students, data]);
        setName("");
        setRollNo("160122737XXX");
        setPassed(false);
      }
    } catch (error) {
      console.error("Error while adding the student: " + error);
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    console.log(name, rollNo, isPassed);
    const newStudent = {
      name,
      rollNo,
      isPassed,
    };
    addStudent(newStudent);
  };

  const deleteStudent = async (id) => {
    console.log(typeof id);
    const response = await fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setStudents(students.filter((student) => student._id !== data._id));
    await console.log("deleted Succesfully");
  };

  const UpdateStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedStudent = await response.json(); // Get the updated student data from the response

      // Update the student list in the state
      setStudents(
        students.map((student) =>
          student._id === updatedStudent._id
            ? { ...student, isPassed: updatedStudent.isPassed }
            : student
        )
      );
    } catch (e) {
      console.error("Error while updating the student: ", e);
    }
  };

  const handleDeleteStudent = (id) => {
    deleteStudent(id);
  };

  const handleUpdateStudent = (id) => {
    UpdateStatus(id);
  };

  useEffect(() => {
    getStudents();
  }, []);

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
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="160122737XXX"
              maxLength={12}
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
            <button id="add-btn" type="submit">
              Add Student
            </button>
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
                  <h3 id="name-text">Student Name:{student.name}</h3>
                  <p id="roll-text">Roll No:{student.rollNo}</p>
                  <h2 id="status">{student.isPassed ? "Passed" : "Failed"}</h2>
                </div>

                <div>
                  <button onClick={() => UpdateStatus(student._id)}>
                    {student.isPassed ? "Mark as Failed" : "Mark as Passed"}
                  </button>
                  <button onClick={() => handleDeleteStudent(student._id)}>
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
