import MessageModel from "./models/Message.js";

export default function handleSocketIo(io) {
  io.on("connection", (socket) => {
    console.log("Add", socket.id);
    socket.on("disconnect", (reason) => {
      console.log("Left", socket.id);
      console.log(reason);
    });
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
