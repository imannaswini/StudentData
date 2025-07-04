import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: '',
    name: '',
    place: '',
    phone: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8000/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => setStudent(data))
      .catch((err) => {
        console.error("Error fetching student:", err);
        alert("Student not found!");
        navigate('/');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...student, id: Number(student.id) })
    }).then(() => navigate('/'));
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="form-style">
        <input name="id" value={student.id} readOnly disabled placeholder="ID" />
        <input name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        <input name="place" value={student.place} onChange={handleChange} placeholder="Place" required />
        <input name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="college" value={student.college} onChange={handleChange} placeholder="College" required />
        <input name="degree" value={student.degree} onChange={handleChange} placeholder="Degree" required />
         <input name="course" value={student.course} onChange={handleChange} placeholder="Course" required />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}