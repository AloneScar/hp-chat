import express from "express";
import { updateQQ, updateUsername } from "../controllers/UserController.js";

const router = express.Router();

router.route("/qq/:qq").get(updateQQ);
router.route("/username").post(updateUsername);

export default router;
