import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

const url = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const LogInEntry = () => {

  const [roomNum, setRoomNum] = useState('');
  const [date, setDate] = useState('');
  const [profName, setProfName] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleEntry = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/logEntry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNum, date, profName, timeIn, timeOut }),
        credentials: 'include',
      });
      // const data = await response.json();

      // if (response.ok && data.success) {

      //   navigate('/student/logentry');
      // } else {
      //   setError(data.message || 'Login failed');
      // }

      setSuccess(true);
      setRoomNum('');
      setDate('');
      setProfName('');
      setTimeIn('');
      setTimeOut('');


    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }

  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h1 className='text-center'> Log in a Lab Entry</h1>

      <form className='bg-blue p-3 rounded shadow' onSubmit={handleEntry}>
        <div className="mb-3 mt-3 fs-4">
          <label htmlFor="roomNum" className="form-label text-white">Room Number:</label>
          <input
            type="text"
            className="bg-lightBlue form-control fs-5"
            id="roomNum"
            placeholder="Enter Room Number"
            name="roomNum"
            value={roomNum}
            onChange={(e) => setRoomNum(e.target.value)}
            required
          />
        </div>
        <div className="mb-3  fs-4">
          <label htmlFor="date" className="form-label text-white">Date:</label>
          <input
            type="date"
            className="bg-lightBlue form-control fs-5"
            id="date"
            placeholder="Enter Date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3  fs-4">
          <label htmlFor="profName" className="form-label text-white">Professor/Admin's Name:</label>
          <input
            type="text"
            className="bg-lightBlue form-control fs-5"
            id="profName"
            placeholder="Enter Professor/Admin's Name"
            name="profName"
            value={profName}
            onChange={(e) => setProfName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3  fs-4">
          <label htmlFor="timeIn" className="form-label text-white">Time in:</label>
          <input
            type="time"
            className="bg-lightBlue form-control fs-5"
            id="timeIn"
            placeholder="Enter Time In"
            name="timeIn"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
            required
          />
        </div>
        <div className="mb-3  fs-4">
          <label htmlFor="timeOut" className="form-label text-white">Time Out:</label>
          <input
            type="time"
            className="bg-lightBlue form-control  fs-5"
            id="timeOut"
            placeholder="Enter Time Out"
            name="timeOut"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
            required
          />
        </div>

        {error && (
          <ul style={{ color: 'text-warning' }}>
            {Array.isArray(error)
              ? error.map((msg, idx) => <li key={idx}>{msg}</li>)
              : <li>{error}</li>
            }
          </ul>
        )}
        {success && (
          <div id="form-message-success" className="alert alert-success mt-4">
            Your entry was logged, thank you!
          </div>
        )}

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-yellow fs-4">
            Submit
          </button>
        </div>
      </form>

    </div>
  )
}

export default LogInEntry