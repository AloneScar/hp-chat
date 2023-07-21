import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import upload from "express-fileupload";
import cookieParser from "cookie-parser";
import ChatRoutes from "./routes/chatRoutes.js";
import ProfileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

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
app.use("/api/profile", ProfileRoutes);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connect to mongodb well");
    app.listen(process.env.PORT, process.env.IP, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
