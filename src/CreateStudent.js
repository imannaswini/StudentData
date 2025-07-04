import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function CreateStudent() {
  const [student, setStudent] = useState({
    name: '',
    place: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!student.name || !student.place || !student.phone) {
      setError('Please fill in all fields.');
      return;
    }

    // POST request (without id - json-server generates it)
    fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create student.');
        return res.json();
      })
      .then(() => {
        navigate('/'); // Go back to table after creating
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong while creating the student.');
      });
  };

  return (
    <div className="container">
      <h2>Create Student</h2>
      <form className="form-style" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Enter Place"
          value={student.place}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={student.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="college"
          placeholder="Enter college"
          value={student.college}
          onChange={handleChange}
        />
         <input
          type="text"
          name="degree"
          placeholder="Enter Degree"
          value={student.degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Enter course"
          value={student.course}
          onChange={handleChange}
        />
        <button type="submit">Add Student</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
