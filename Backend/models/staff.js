import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  department: String,
  password: String,
});

export default mongoose.model("Staff", staffSchema);
