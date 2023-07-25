import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  register_time: String,
  qq: { type: String, default: "" },
});

export default mongoose.model("User", UserSchema);
