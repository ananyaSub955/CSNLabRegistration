import React from 'react'
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';


const StudentNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg px-4 mb-2">
            <a className="navbar-brand" href="/student/logentry">
                <img src={logo} alt="CSN Logo" style={{ width: '200px' }} />
            </a>
            <li className="nav-item">
                <NavLink className="nav-link rounded px-4 loginHover me-2" to="/student/logentry">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link rounded px-4 loginHover me-2" to="/student/history">History</NavLink>
            </li>
        </nav>
    )
}

export default StudentNavbar