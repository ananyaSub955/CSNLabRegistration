import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const url = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("Attempting login with:", { email, password: "***" });
    // console.log("URL:", `${url}/login`);

    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const roleResponse = await fetch(`${url}/session`, { credentials: "include" });
        const user = await roleResponse.json();
        redirectToDashboard(user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };

  const redirectToDashboard = ({ isProf}) => {
    if (isProf) {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/logentry');
    }
  };


  return (
    <div className="container mt-5 fs-4" style={{ maxWidth: '400px' }}>
      <h1 className="text-blue p-3 text-center fw-bold">
        <b>Login</b>
      </h1>
      <form className='bg-blue p-3 rounded' onSubmit={handleLogin}>
        <div className="mb-3 mt-3  fs-4">
          <label htmlFor="email" className="form-label text-white">Email:</label>
          <input
            type="email"
            className="bg-lightBlue form-control fs-5"
            id="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3  fs-4">
          <label htmlFor="pwd" className="form-label text-white">Password:</label>
          <input
            type="password"
            className="bg-lightBlue form-control fs-5"
            id="pwd"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-warning">{error}</p>}


        <p className='mt-4 text-white fs-5'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signUpPage')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up Here
          </span>
        </p>

        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-yellow fs-4 mb-5">
            Login
          </button>
        </div>

      </form>
    </div>
  );
};

export default Login;
