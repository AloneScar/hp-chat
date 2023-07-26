import { PrivateMsgModel, RoomMsgModel } from "./models/Message.js";

export default function handleSocketIo(io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", (reason) => {});
    socket.on("send_private_msg", async (msg) => {
      try {
        const msgDoc = await PrivateMsgModel.create(msg);
        socket.emit(msg.recipientName, msgDoc);
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("send_room_msg", async (msg) => {
      try {
        const msgDoc = await RoomMsgModel.create(msg);
        socket.emit(msg.roomName, msgDoc);
      } catch (err) {
        console.log(err);
      }
    });
  });
}
