import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentHistory = () =>{

  const navigate = useNavigate()

  return(
    <div>
        <h1> Student History Page</h1>
        {/* <div className = 'historyButtons'>
          <button onClick={() => navigate('/date')}>History Date</button>
          <button onClick={() => navigate('/form')}>History Form</button>

        </div> */}
    </div>
  )
}

export default StudentHistory