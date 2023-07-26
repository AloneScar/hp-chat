import express from "express";
import { format } from "date-fns";
import mongoose from "mongoose";
import cors from "cors";
import upload from "express-fileupload";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import * as dotenv from "dotenv";
import AuthRoutes from "./routes/AuthRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import handleSocketIo from "./HandleSocketIo.js";
import Room from "./models/Room.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

handleSocketIo(io);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(upload());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/chat", ChatRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("connect to mongodb well");
    try {
      await Room.create({
        roomname: "Public",
        create_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      });
    } catch (err) {}
    httpServer.listen(process.env.PORT, process.env.IP, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
