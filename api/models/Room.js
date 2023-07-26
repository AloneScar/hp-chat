import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomname: { type: String, unique: true },
  create_time: String,
});

export default mongoose.model("Room", RoomSchema);
