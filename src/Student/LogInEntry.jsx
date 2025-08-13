import React, { useState, useEffect } from 'react'
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
  const [profs, setProfs] = useState([]);
  const [profId, setProfId] = useState('');


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${url}/profs`, { credentials: 'include' });
        if (!res.ok) {
          // Log the text body for easier debugging when it's not JSON
          const text = await res.text();
          throw new Error(`Failed to load profs (${res.status}): ${text.slice(0, 120)}...`);
        }
        const data = await res.json();
        if (data.success) setProfs(data.profs);
        else throw new Error(data.message || "Unknown error loading profs");
      } catch (err) {
        console.error("Error fetching professors:", err);
        setProfs([]); // optional: fallback to empty list
      }
    })();
  }, []);



  const handleEntry = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/logEntry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNum, date, profName, profId, timeIn, timeOut }),
        credentials: 'include',
      });

      let payloadText = await response.text();
      let payload;
      try { payload = JSON.parse(payloadText); } catch { payload = { message: payloadText }; }

      if (!response.ok || !payload.success) {
        setSuccess(false);
        setError(payload.message || `Failed (${response.status})`);
        return;
      }


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
        <div className="mb-3 fs-4">
          <label htmlFor="profName" className="form-label text-white">
            Professor/Admin:
          </label>
          <select
            id="profName"
            className="bg-lightBlue form-control fs-5"   // <-- moved styling here
            value={profId}
            onChange={(e) => {
              const selected = profs.find(p => p._id === e.target.value);
              //console.log(selected);
              setProfId(e.target.value);
              setProfName(selected ? `${selected.firstName} ${selected.lastName}` : '');
            }}
            required
          >
            <option value="" disabled>
              Select a Professor
            </option>
            {profs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </select>
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