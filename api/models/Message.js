import mongoose from "mongoose";

const PrivateMsgSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contents: String,
  send_time: String,
});

const RoomMsgSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  contents: String,
  send_time: String,
});

export const PrivateMsgModel = mongoose.model("PrivateMsg", PrivateMsgSchema);
export const RoomMsgModel = mongoose.model("RoomMsg", RoomMsgSchema);
