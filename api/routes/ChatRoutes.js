import express from "express";
import {
  getRoomMsgs,
  getPrivateMsgs,
  getContacts,
} from "../controllers/ChatController.js";

const router = express.Router();

router.route("/room/:roomId").get(getRoomMsgs);
router.route("/recipient/:recipientId").get(getPrivateMsgs);
router.route("/contacts").get(getContacts);

export default router;
