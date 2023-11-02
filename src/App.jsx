import React, { useEffect, useState } from 'react'
import './App.css'
import Students from './components/Students'

function App() {
  const BASE_URL = 'http://localhost:3000/studentsData';

  const [data, setData] = useState({ name: '', subject: '', marks: '' });
  const [students, setStudents] = useState([]);

  function handleFormData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((stud) => {
        setStudents([...students, stud]);
        setData({ name: '', subject: '', marks: '' });
      });
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={data.name} placeholder="name" required onChange={handleFormData} />
        <input type="text" name="subject" value={data.subject} placeholder="subject" required onChange={handleFormData} />
        <input type="number" name="marks" value={data.marks} placeholder="marks" required onChange={handleFormData} />
        <br></br>
        <button type="submit">Submit</button>
      </form>

      {students.map((student, index) => (
        <Students key={index} id={student.id} students={students} setStudents={setStudents} name={student.name} subject={student.subject} marks={student.marks} setData={setData} data={data}/>
      ))}
    </div>
  );
}

export default App;
