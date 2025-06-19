import React from 'react'

const LogInEntry = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h1> Log in a Lab Entry</h1>

      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="text" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roomNum" className="form-label">Room Number:</label>
          <input
            type="text"
            className="form-control"
            id="roomNumber"
            placeholder="Enter Room Number"
            name="roomNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Enter Date"
            name="date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profName" className="form-label">Professor/Admin's Name:</label>
          <input
            type="text"
            className="form-control"
            id="profName"
            placeholder="Enter Professor/Admin's Name"
            name="profName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeIn" className="form-label">Time in:</label>
          <input
            type="time"
            className="form-control"
            id="timeIn"
            placeholder="Enter Time In"
            name="timeIn"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeOut" className="form-label">Time Out:</label>
          <input
            type="time"
            className="form-control"
            id="timeOut"
            placeholder="Enter Time Out"
            name="timeOut"
          />
        </div>
         <button type="submit" className="btn btn-one">
          Submit
        </button>
      </form>

    </div>
  )
}

export default LogInEntry