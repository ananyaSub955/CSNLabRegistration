import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // const navigate = useNavigate();

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    // //const [result, setResult] = useState('');
    // const [frequency, setFrequency] = useState('monthly');


    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     if (!firstName || !lastName || !email || !password) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${url}/individualSignup`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ firstName, lastName, email, password, frequency }),
    //             credentials: "include",
    //         });

    //         const data = await response.json();
    //         if (response.ok && data.url) {
    //             window.location.href = data.url; // Stripe checkout
    //         } else {
    //             setError(data.message || "Signup failed.");
    //         }
    //     } catch (err) {
    //         console.error("Signup error:", err);
    //         setError("An error occurred during signup.");
    //     }
    // };


    // const result = validatePassword(password);


    return (
        <div className="container mt-4 fs-4" style={{ maxWidth: '500px' }}>
            <h1 className="text-blue p-3 text-center fw-bold">
                <b>Individual Sign up </b>
            </h1>

            <form className="bg-blue p-3 rounded " >
                {/* onSubmit={handleSignUp} */}
                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label text-white"> <b>First Name:</b></label>
                    <input
                        type="text"
                        className="bg-lightBlue form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        name="firstName"
                    // value={firstName}
                    // onChange={(e) => setFirstName(e.target.value)}
                    // required
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
                    // value={lastName}
                    // onChange={(e) => setLastName(e.target.value)}
                    // required
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
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    // required
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
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // required
                    />
                </div>
                <button type="submit" className="btn btn-yellow mt-4 fs-4 ju">
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default SignUp