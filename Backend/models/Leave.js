import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  reason: String,
  fromDate: String,
  toDate: String,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Leave", leaveSchema);
