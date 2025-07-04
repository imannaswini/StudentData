import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

export default function ViewDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (notFound || !student) return <div style={{ color: 'red' }}>Student not found.</div>;

  return (
    <div className="container">
      <h2>Student Details</h2>
      <div className="details-box">
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Place:</strong> {student.place}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>College:</strong> {student.college}</p>
         <p><strong>Degree:</strong> {student.degree}</p>
         <p><strong>Course:</strong> {student.course}</p>
        <Link to="/" className="btn btn-add">Back to List</Link>
      </div>
    </div>
  );
}