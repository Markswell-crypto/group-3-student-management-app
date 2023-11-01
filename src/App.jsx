import { useEffect, useState } from 'react'
import './App.css'
import Students from './components/Students'

function App() {
   const BASE_URL ='http://localhost:3000/studentsData'

  const student ={
    name:'',
subject:'',
marks:'',
}
const [data, setData] =useState(student)
const [users, setUsers]= useState([])


function handleFormData (e) {
  
  setData ({...data, [e.target.name]:e.target.value})
}

function handleSubmit(e){
  e.preventDefault()
  console.log('ha')




fetch(BASE_URL, {

  method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify (student)
  

})
.then((res)=> res.json())
.then((stud) => setData(...data, stud)  )
}
useEffect(()=> {
  fetch(BASE_URL)
  .then((res)=> res.json)
  .then((data)=> setData(data))
},[])


return (
   
      <div>
<form onSubmit={handleSubmit}>
  < input type='text'  name ='name' value={data['name']} placeholder='name' required onChange={handleFormData} />
  < input type='text'  name ='subject' value={data['subject']} placeholder='subject' required onChange={handleFormData} />
  < input type='number' name= 'marks' value={data['marks']} placeholder='marks' required onChange={handleFormData} />
  <br></br>
  <button type='submit'>Submit</button>

</form>





      <Students/>
      </div>
     
   
  )
}

export default App
