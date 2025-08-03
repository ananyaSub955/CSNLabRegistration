import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const JobsLayout = () => {
    //const navigate = useNavigate()

    return (
        <div>
           <h2> Jobs opening </h2>
           <p> list of job openings</p>
           <Outlet/>
        </div>
    )
}

export default JobsLayout