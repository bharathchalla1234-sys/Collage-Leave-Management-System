import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://10.101.98.23:5000/api/staff";

export default function StaffApp() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/requests`);
      setRequests(res.data);
    } catch (err) {
      setError("Failed to fetch requests");
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    setError("");
    try {
      await axios.put(`${API_BASE}/approve/${id}`);
      fetchRequests();
    } catch (err) {
      setError("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    setError("");
    try {
      await axios.put(`${API_BASE}/reject/${id}`);
      fetchRequests();
    } catch (err) {
      setError("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>👨‍🏫 Staff Panel - Leave Requests</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          >
            <p>
              <b>Student:</b> {req.student?.name || req.name || "Unknown"}
            </p>
            <p>
              <b>Reason:</b> {req.reason}
            </p>
            <p>
              <b>Dates:</b> {req.fromDate || "-"} → {req.toDate || "-"}
            </p>
            <p>
              <b>Status:</b> {req.status}
            </p>
            {req.status === "Pending" && (
              <>
                <button onClick={() => handleApprove(req._id)}>Approve</button>
                <button onClick={() => handleReject(req._id)}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
