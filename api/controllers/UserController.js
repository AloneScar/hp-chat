import axios from "axios";
import { verify_token } from "./AuthController.js";
import UserModel from "../models/User.js";

export const updateQQ = (req, res) => {
  const { qq } = req.params;
  verify_token(req.cookies?.token, ([isUser, ret, statusCode]) => {
    if (!isUser) {
      return res.status(statusCode).send(ret);
    }
    axios.get(`https://q.qlogo.cn/g?b=qq&nk=${qq}&s=100`).then(async (resp) => {
      if ("x-errno" in resp.headers) {
        res.send("this qq number does not exist");
      } else {
        await UserModel.updateOne(
          { _id: ret.userId },
          {
            $set: {
              qq: qq,
            },
          },
        )
          .then(() => {
            console.log(`Updated a user, _id: ${ret.userId}`);
            res.status(201).send(qq);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("server errror");
          });
      }
    });
  });
};

export const updateUsername = (req, res) => {
  const username = req.body?.username;
  verify_token(req.cookies?.token, async ([isUser, ret, statusCode]) => {
    if (!isUser) {
      return res.status(statusCode).send(ret);
    }
    if (username && username.trim()) {
      if (username.length > 4 && username.length < 16) {
        await UserModel.updateOne(
          {
            _id: ret.userId,
          },
          {
            $set: {
              username: username,
            },
          },
        )
          .then(() => {
            console.log(`Updated a user, _id: ${ret.userId}`);
            res.status(201).send(username);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Server errror");
          });
      } else {
        res.status(500).send("User data invalid");
      }
    } else {
      res.status(500).send("No user data");
    }
  });
};
