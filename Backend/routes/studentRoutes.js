import express from "express";
const router = express.Router();

let leaves = []; // temporary in-memory storage

// Apply for leave
router.post("/apply", (req, res) => {
  const { studentId, reason, fromDate, toDate } = req.body;

  if (!studentId || !reason || !fromDate || !toDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLeave = { studentId, reason, fromDate, toDate, status: "Pending" };
  leaves.push(newLeave);

  res.status(201).json({ message: "Leave Applied Successfully", leave: newLeave });
});

// Get leave status by studentId
router.get("/status/:studentId", (req, res) => {
  const { studentId } = req.params;
  const studentLeaves = leaves.filter(l => l.studentId === studentId);
  res.json(studentLeaves);
});

export default router;
