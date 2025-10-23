// index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fake in-memory database
let leaves = [];
let id = 1;

// POST: Submit a new leave request
app.post("/api/leaves", (req, res) => {
  const { name, rollNo, reason } = req.body;
  if (!name || !rollNo || !reason) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newLeave = { id: id++, name, rollNo, reason, status: "Pending" };
  leaves.push(newLeave);
  res.json(newLeave);
});

// GET: Fetch all leave requests
app.get("/api/leaves", (req, res) => {
  res.json(leaves);
});

// PUT: Approve leave
app.put("/api/leaves/approve/:id", (req, res) => {
  const leave = leaves.find((l) => l.id == req.params.id);
  if (leave) leave.status = "Approved";
  res.json(leave || { error: "Not found" });
});

// PUT: Reject leave
app.put("/api/leaves/reject/:id", (req, res) => {
  const leave = leaves.find((l) => l.id == req.params.id);
  if (leave) leave.status = "Rejected";
  res.json(leave || { error: "Not found" });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
