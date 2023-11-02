import React, {useState} from 'react'

function Students({name, subject, marks, id, students, setStudents}) {
  const [data, setData] = useState({ name:'' , subject:'' , marks:'' });

  function handleUpdate(e) {
    
    setData({ ...data, [e.target.name]: e.target.value });
  }
    function handleDelete(){
      fetch(`http://localhost:3000/studentsData/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(() => {
        let deleteStud = students.filter((stud) => stud.id !== id)
        setStudents(deleteStud)
      })
    }
    function handleUpdatedForm(){
      fetch(`http://localhost:3000/studentsData/${id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }) 
      .then(res => res.json())
      .then(() => {
        let updatedStud = data.map(studData => {
          if(studData.id === id){
            studData.name = data.name
            studData.subject = data.subject
            studData.marks = data.marks
          }
          return studData
        })
        setData(updatedStud)
        setData({ name: '', subject: '', marks: '' });
      })
    }
  return (
    <div>
      <h4>Student Data</h4>
      <p>name: {name}</p>
      <p>subject: {subject}</p>
      <p>marks: {marks}</p>
      <form onSubmit={handleUpdatedForm}>
        <input type="text" name="name" value={data.name} placeholder="Update Name" required onChange={handleUpdate} />
        <input type="text" name="subject" value={data.subject} placeholder="Update Subject" required onChange={handleUpdate} />
        <input type="number" name="marks" value={data.marks} placeholder="Update Marks" required onChange={handleUpdate} />
        <br></br>
        <button type="submit">Update</button>
      </form>
        <br></br>
      <button onClick={handleDelete} >Delete</button>
    </div>
  )
}

export default Students;
