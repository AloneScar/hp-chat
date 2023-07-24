import express from "express";
import { getAllMessage } from "../controllers/ChatController.js";

const router = express.Router();

router.route("/").get(getAllMessage);

export default router;
