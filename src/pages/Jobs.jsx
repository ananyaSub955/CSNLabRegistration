import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Jobs = () => {

    const jobsData = useLoaderData();


    return (
        <div>
            {jobsData.map((job) => {
                // can click on a job and takes you to that specific job
                return <Link to={job.id.toString()} key = {job.id} >
                <h4>{job.title}</h4>
                <p>{job.location}</p>
            </Link>
        })}
    </div >
  )
}

export default Jobs

export const jobsLoader = async () => {
    const res = await fetch("http://localhost:3000/jobs");
    if(!res.ok){
        throw Error("could not find job list")
    }
    return res.json();
}