import React from 'react'

function Students({name, subject, marks}) {
    

    const student ={
        name:'',
    subject:'',
    marks:'',
    }





  return (
    <div>
      <h1>Student Data</h1>
      <p>name:{name}</p>
      <p>subject:{subject}</p>
      <p>marks:{marks}</p>
    </div>
  )
}

export default Students;
