// backend/server.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/StudentRoutes.js";
import staffRoutes from "./routes/StaffRoutes.js";

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Define routes
app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("College Leave Management System Backend is Running 🚀");
});

// ✅ Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
