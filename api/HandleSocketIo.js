import MessageModel from "./models/Message.js";

export default function handleSocketIo(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", async (msg) => {
      try {
        const msgDoc = await MessageModel.create(msg);
        socket.broadcast.emit("receive_message", msgDoc);
      } catch (err) {
        console.log(err);
      }
    });
  });
}
