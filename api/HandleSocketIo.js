export default function handleSocketIo(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", (msg) => {
      socket.broadcast.emit("receive_message", msg);
    });
  });
}
