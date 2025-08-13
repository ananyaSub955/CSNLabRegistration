import React, { useState, useEffect } from 'react';

const url = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);   // <-- array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${url}/profEntries`, { credentials: 'include' });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Failed (${res.status}): ${txt.slice(0,120)}...`);
        }
        const data = await res.json();
        if (data.success) setEntries(data.entries || []);
        else throw new Error(data.message || 'Unknown error');
      } catch (e) {
        console.error('Error fetching professor entries:', e);
        setError('Could not load entries.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Student History</h1>

      {loading && <div className="text-center fs-5">Loading…</div>}
      {error && <div className="alert alert-warning">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <div className="text-center text-muted">No entries yet.</div>
      )}

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {entries.map((entry) => (
            <div key={entry.id} className="card bg-lightBlue text-dark mb-4 p-4 shadow rounded">
              <div className="card-body">
                <p className="fs-4"><strong>Date:</strong> {entry.date || "--/--/----"}</p>
                <p className="fs-4"><strong>Student:</strong> {entry.studentName || "---"}</p>
                {/* <p className="fs-4"><strong>Student:</strong> {entry.student || "---"}</p> */}
                <p className="fs-4"><strong>Room:</strong> {entry.roomNum || "--"}</p>
                <p className="fs-4"><strong>Time:</strong> {(entry.timeIn || "00:00")} – {(entry.timeOut || "00:00")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
