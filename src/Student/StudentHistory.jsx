import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditEntry from './components/EditEntry';

const url = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const StudentHistory = () => {

  const navigate = useNavigate()

  //const [userId, setUserId] = useState(null);
  const [entries, setEntries] = useState([]);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${url}/studentHistory`, {
          method: 'POST',
          credentials: 'include',
        });
        const data = await response.json();

        if (data.success) {
          setEntries(data.entries);
        }
      } catch (err) {
        console.error("Failed to fetch student history", err);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (entryId) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (!confirm) return;

    try {
      const res = await fetch(`${url}/entry/${entryId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();
      if (data.success) {
        setEntries(entries.filter(entry => entry.id !== entryId));
      } else {
        alert(data.message || "Failed to delete entry");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Something went wrong.");
    }
  };

  const handleReuse = async (entry) => {
    try {
      const res = await fetch(`${url}/logEntry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          roomNum: entry.roomNum,
          date: new Date().toISOString().slice(0, 10),
          profName: entry.profName,
          timeIn: entry.timeIn,
          timeOut: entry.timeOut,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Entry reused successfully!");
      }
    } catch (error) {
      console.error("Reuse failed", error);
      alert("Error reusing entry");
    }
  };



  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Student History</h1>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">

          {entries.map(entry => (
            <div key={entry.id} className="card bg-lightBlue text-dark mb-4 p-4 shadow rounded">
              <div className="card-body">
                <p className="fs-4"><strong>Date:</strong> {entry.date || "--/--/----"}</p>
                <p className="fs-4"><strong>Professor/Admin Name:</strong> {entry.profName || "---"}</p>
                <p className="fs-4"><strong>Room Number:</strong> {entry.roomNum || "--"}</p>
                <p className="fs-4"><strong>Time:</strong> {entry.timeIn || "00:00"} - {entry.timeOut || "00:00"}</p>

                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-4">
                  <button
                    className="btn btn-warning fw-bold w-100 w-sm-auto fs-5"
                    onClick={() => navigate(`/student/editEntry/${entry.id}`)}
                  >
                    Edit Entry
                  </button>

                  <button
                    className="btn btn-warning fw-bold w-100 w-sm-auto fs-5"
                    onClick={() => handleReuse(entry)}
                  >
                    Reuse Entry
                  </button>

                  <button
                    className="btn btn-warning fw-bold w-100 w-sm-auto fs-5"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StudentHistory