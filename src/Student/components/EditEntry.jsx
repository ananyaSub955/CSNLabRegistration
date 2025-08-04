import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const url = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://itws-4500-s25-team6.eastus.cloudapp.azure.com/node";

const EditEntry = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await fetch(`${url}/entry/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok && data.entry) {
                    setEntry(data.entry);
                } else {
                    setError(data.message || "Entry not found.");
                }
            } catch (err) {
                setError("Failed to fetch entry.");
            } finally {
                setLoading(false);
            }
        };

        fetchEntry();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${url}/entry/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(entry),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert("Entry updated successfully.");
                navigate('/student/history');
            } else {
                alert(data.message || "Update failed.");
            }
        } catch (err) {
            alert("An error occurred while updating.");
        }
    };

    const handleChange = (e) => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    if (loading) return <p className="text-center mt-5">Loading entry...</p>;
    if (error) return <p className="text-danger text-center mt-5">{error}</p>;

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h1 className="mb-4 text-center">Edit Entry</h1>
            <form className="bg-blue p-3 rounded shadow" onSubmit={handleSubmit}>
                <div className="mb-3 mt-3 fs-4">
                    <label className="form-label fw-bold text-white">Date</label>
                    <input
                        type="date"
                        name="date"
                        className="bg-lightBlue form-control fs-5"
                        value={entry.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 fs-4">
                    <label className="form-label fw-bold text-white">Professor/Admin Name</label>
                    <input
                        type="text"
                        name="profName"
                        className="bg-lightBlue form-control fs-5"
                        value={entry.profName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 fs-4">
                    <label className="form-label fw-bold text-white">Room Number</label>
                    <input
                        type="text"
                        name="roomNum"
                        className="bg-lightBlue form-control fs-5"
                        value={entry.roomNum}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 fs-4">
                    <label className="form-label fw-bold text-white">Time In</label>
                    <input
                        type="time"
                        name="timeIn"
                        className="bg-lightBlue form-control fs-5"
                        value={entry.timeIn}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3 fs-4">
                    <label className="form-label fw-bold text-white">Time Out</label>
                    <input
                        type="time"
                        name="timeOut"
                        className="bg-lightBlue form-control fs-5"
                        value={entry.timeOut}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-yellow fs-4">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditEntry;
