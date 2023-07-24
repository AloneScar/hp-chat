import MessageModel from "../models/Message.js";

export const getAllMessage = async (_, res) => {
  try {
    const msgsDoc = await MessageModel.find().sort({ send_time: 1 });
    res.status(200).json(msgsDoc);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
