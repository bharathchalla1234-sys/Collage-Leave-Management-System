import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5001/api/student"; // ✅ Change this to localhost:5000

export default function StudentApp() {
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyLeave = async () => {
    setError("");
    if (!studentId || !reason || !fromDate || !toDate) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/apply`, {
        studentId,
        reason,
        fromDate,
        toDate,
      });
      alert("✅ Leave Applied Successfully!");
      fetchStatus();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to apply for leave.");
    }
    setLoading(false);
  };

  const fetchStatus = async () => {
    setError("");
    if (!studentId) {
      setError("Enter Student ID to view status.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/status/${studentId}`);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch leave status.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎓 Student Leave Application</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      /><br />
      <input
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      /><br />
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      /><br />

      <button onClick={applyLeave} disabled={loading}>Apply Leave</button>
      <button onClick={fetchStatus} disabled={loading || !studentId}>View Status</button>

      <h3>My Leaves</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {leaves.map((leave, i) => (
            <li key={i}>
              {leave.reason} ({leave.fromDate} → {leave.toDate}) — <b>{leave.status}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
