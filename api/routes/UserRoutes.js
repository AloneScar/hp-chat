import express from "express";
import { postQQNum } from "../controllers/UserController.js";

const router = express.Router();

router.route("/qq").post(postQQNum);

export default router;
