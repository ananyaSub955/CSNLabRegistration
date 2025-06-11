import React from 'react'
import logo from '../assets/logo.png'
//import { Link } from 'react-router-dom'
import { NavLink, useNavigate} from 'react-router-dom'

const Navbar = () =>{

    const navigate = useNavigate()

  return(
    <div className='navbar'>
        <img className='logo' src ={logo} alt = "CSN logo"></img>
        <ul>
            <NavLink to = '/'><li>Login</li></NavLink>
            <NavLink to = '/logentry'><li>Log an Entry</li></NavLink>
            <NavLink to = '/history'><li>Student History</li></NavLink>
            <NavLink to = '/jobs'><li>Jobs</li></NavLink>

        </ul>
        <button onClick={() => navigate('/history')}> Get started </button>
    </div>
  )
}

export default Navbar