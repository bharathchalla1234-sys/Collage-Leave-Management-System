import express from "express";
const router = express.Router();

let leaves = []; // this will be shared later with DB

// View all leave requests (for staff)
router.get("/leaves", (req, res) => {
  res.json(leaves);
});

// Approve or reject leave
router.post("/update-status", (req, res) => {
  const { studentId, status } = req.body;
  const leave = leaves.find(l => l.studentId === studentId);
  if (leave) {
    leave.status = status;
    return res.json({ message: `Leave ${status} successfully` });
  } else {
    return res.status(404).json({ message: "Leave not found" });
  }
});

export default router;
