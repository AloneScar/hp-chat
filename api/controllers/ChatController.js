import { RoomMsgModel } from "../models/Message.js";
import User from "../models/User.js";
import Room from "../models/Room.js";
import { verify_token } from "./AuthController.js";

export const getRoomMsgs = async (req, res) => {
  const { roomId } = req.params;
  verify_token(req.cookies?.token, async ([isUser, ret, statusCode]) => {
    if (!isUser) {
      res.status(statusCode).send(ret);
    }
    try {
      const msgsDoc = await RoomMsgModel.find({
        room: roomId,
      }).sort({ send_time: 1 });
      res.status(200).json(msgsDoc);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });
};

export const getPrivateMsgs = async (req, res) => {
  const { recepientId } = req.params;
  verify_token(req.cookies?.token, async ([isUser, ret, statusCode]) => {
    if (!isUser) {
      res.status(statusCode).send(ret);
    }
    try {
      const msgsDoc = await RoomMsgModel.find({
        recepient: recepientId,
      }).sort({ send_time: 1 });
      res.status(200).json(msgsDoc);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });
};
export const getContacts = async (req, res) => {
  verify_token(req.cookies?.token, async ([isUser, ret, statusCode]) => {
    if (!isUser) {
      res.status(statusCode).send(ret);
    }
    try {
      const usersDoc = await User.find({}, { password: 0 }).sort({
        send_time: 1,
      });
      const roomsDoc = await Room.find().sort({ create_time: 1 });
      res.json({ usersDoc, roomsDoc });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });
};
