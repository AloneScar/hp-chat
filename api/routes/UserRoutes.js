import express from "express";
import { helloworld } from "../controllers/UserController.js";

const router = express.Router();

router.route("/").get(helloworld);

export default router;
