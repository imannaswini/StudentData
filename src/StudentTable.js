import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student list from server
  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch students.');
        }
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle student deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`http://localhost:8000/students/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setStudents((prev) => prev.filter((student) => student.id !== id));
        })
        .catch((err) => console.error('Delete failed:', err));
    }
  };

  if (loading) {
    return <div className="container"><p>Loading students...</p></div>;
  }

  if (error) {
    return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-add">Add New Student</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
               <th>College</th>
               <th>Degree</th>
               <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id || `${student.name}-${student.phone}`}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.place}</td>
                  <td>{student.phone}</td>
                  <td>{student.college}</td>
                  <td>{student.degree}</td>
                  <td>{student.course}</td>
                  <td className="action-buttons">
                    <Link to={`/student/view/${student.id}`} className="btn view-btn">View</Link>
                    <Link to={`/student/edit/${student.id}`} className="btn edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(student.id)} className="btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
