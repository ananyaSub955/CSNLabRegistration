import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const url = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const [result, setResult] = useState('');
    const [frequency, setFrequency] = useState('monthly');


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {

            const valid = /^[\w.-]+@csn\.edu$/.test(email);
            if (!valid) {
                alert('Please use a valid CSN email address.');
                return;
            }

            const response = await fetch(`${url}/signUp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password }),
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok && data.success) {
                navigate('/student/logentry');
            } else {
                setError(data.message || "Signup failed.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("An error occurred during signup.");
        }
    };

    const validatePassword = (password) => {
        return {
            valid: (
                password.length >= 8 &&
                /[a-z]/.test(password) &&
                /[A-Z]/.test(password) &&
                /\d/.test(password) &&
                /[@$!%*?&]/.test(password)
            ),
            checks: {
                length: password.length >= 8,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                number: /\d/.test(password),
                special: /[@$!%*?&]/.test(password),
            }
        };
    };


    const result = validatePassword(password);


    return (
        <div className="container mt-4 fs-4" style={{ maxWidth: '500px' }}>
            <h1 className="text-blue p-3 text-center fw-bold">
                <b>Individual Sign up </b>
            </h1>

            <form className="bg-blue p-3 rounded" onSubmit={handleSignUp} >
                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label text-white"> <b>First Name:</b></label>
                    <input
                        type="text"
                        className="bg-lightBlue form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="lastName" className="form-label text-white"> <b>Last Name:</b></label>
                    <input
                        type="text"
                        className="bg-lightBlue form-control"
                        id="lastName"
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label text-white"> <b>Email:</b></label>
                    <input
                        type="email"
                        className="bg-lightBlue form-control"
                        id="email"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="password" className="form-label text-white"> <b>Password:</b></label>
                    <input
                        type="password"
                        className="bg-lightBlue form-control text-dark"
                        id="password"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-2">
                    <p className="mb-1 text-light"><b>Password must include:</b></p>
                    <ul className="list-unstyled fs-5">
                        <li style={{ opacity: result.checks.length ? 0.4 : 1 }} className="text-warning">✓ At least 8 characters</li>
                        <li style={{ opacity: result.checks.lowercase ? 0.4 : 1 }} className="text-warning">✓ A lowercase letter</li>
                        <li style={{ opacity: result.checks.uppercase ? 0.4 : 1 }} className="text-warning">✓ An uppercase letter</li>
                        <li style={{ opacity: result.checks.number ? 0.4 : 1 }} className="text-warning">✓ A number</li>
                        <li style={{ opacity: result.checks.special ? 0.4 : 1 }} className="text-warning">✓ A special character (@$!%*?&)</li>
                    </ul>
                </div>

                {error && (
                    <ul style={{ color: 'text-red' }}>
                        {Array.isArray(error)
                            ? error.map((msg, idx) => <li key={idx}>{msg}</li>)
                            : <li>{error}</li>
                        }
                    </ul>
                )}

                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-yellow mt-4 fs-4 ju">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp