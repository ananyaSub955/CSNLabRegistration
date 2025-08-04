import React from 'react'
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const url = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const StudentNavbar = () => {

    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            const response = await fetch(`${url}/logout`, {
                credentials: "include",
            });
            if (response.ok) {

                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    return (
        <nav className="navbar navbar-expand-lg bg-light px-4 mb-2">
            <a className="navbar-brand" href="/student/logentry">
                <img src={logo} alt="CSN Logo" style={{ width: '200px' }} />
            </a>
            <div className="container-fluid">
                <ul className="navbar-nav ms-auto fs-5">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/student/logentry">New Entry</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/student/history">History</NavLink>
                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link rounded px-4 loginHover me-2"
                            role="button"
                            onClick={logoutUser}
                            style={{ cursor: 'pointer' }}
                        >
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default StudentNavbar