import express from "express";
import {
  Authenticate,
  Logout,
  Register,
  Login,
} from "../controllers/AuthController.js";

const router = express.Router();

router.route("/").get(Authenticate).delete(Logout);
router.route("/register").post(Register);
router.route("/login").post(Login);

export default router;
