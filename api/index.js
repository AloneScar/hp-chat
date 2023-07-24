import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import upload from "express-fileupload";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import * as dotenv from "dotenv";
import ChatRoutes from "./routes/ChatRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import handleSocketIo from "./HandleSocketIo.js";

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

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connect to mongodb well");
    httpServer.listen(process.env.PORT, process.env.IP, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
