import React from 'react'
import { useLoaderData } from 'react-router-dom'
//import { useParams } from 'react-router-dom'


const JobDetails = () => {

    //const { id } = useParams()
    const JobDetails = useLoaderData();

    return (
        <div>
            {/* <h1> id is: {id}</h1> */}
        <p> <b> Job Title: </b>{JobDetails.title}</p>
        <p> <b> Salary: </b>{JobDetails.salary}</p>
        <p> <b> Job Location: </b>{JobDetails.location}</p>

        </div>
    )
}

export default JobDetails

export const JobDetailsLoader = async ({params}) =>{
    const {id} = params;
    const res = await fetch("http://localhost:3000/jobs/" + id);
    
    if (!res.ok){
        throw Error("could not find job details")
    }

    return res.json();
}