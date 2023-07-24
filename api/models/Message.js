import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: String,
  contents: String,
  send_time: String,
});

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
