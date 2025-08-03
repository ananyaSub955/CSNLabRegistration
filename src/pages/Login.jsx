import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="container mt-5 fs-4" style={{ maxWidth: '400px' }}>
      <h1 className="text-blue p-3 text-center fw-bold">
        <b>Login</b>
      </h1>
      <form className='bg-blue p-3 rounded'>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label text-white">Email:</label>
          <input
            type="email"
            className="bg-lightBlue form-control"
            id="email"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label text-white">Password:</label>
          <input
            type="password"
            className="bg-lightBlue form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
          />
        </div>
        <p className='mt-4 text-white fs-5'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signUp')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up Here
          </span>
        </p>
        <button type="submit" className="btn btn-yellow fs-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
