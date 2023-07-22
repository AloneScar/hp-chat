import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { format } from "date-fns";
import UserModel from "../models/User.js";

dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const verify_user_data = (username, password) => {
  if (!(username && password)) {
    return [true, "No user data"];
  }
  if (!(username.trim() && password.trim())) {
    return [true, "No user data"];
  }
  if (
    username.length <= 4 ||
    username.length >= 16 ||
    password.length <= 4 ||
    password.length >= 16
  ) {
    return [true, "User data is invalid"];
  }
  return [false, ""];
};

export const Authenticate = (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        return res.status(500).send("server error");
      }
      res.status(200).json(userData);
    });
  } else {
    res.status(401).send("no token");
  }
};

export const Register = async (req, res) => {
  let { username, password } = req.body;
  let [err, ret] = verify_user_data(username, password);
  if (err) {
    return res.send(ret);
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const UserDoc = await UserModel.create({
      username: username,
      password: hashedPassword,
      register_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
    jwt.sign({ userId: UserDoc._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(201)
        .send("register well");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  let [err, ret] = verify_user_data(username, password);
  if (err) {
    return res.send(ret);
  }
  try {
    const UserDoc = await UserModel.findOne({ username });
    if (UserDoc) {
      if (bcrypt.compareSync(password, UserDoc.password)) {
        jwt.sign(
          { userId: UserDoc._id, username },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { sameSite: "none", secure: true })
              .status(200)
              .json({ id: UserDoc._id });
          },
        );
      } else {
        res.status(500).send("password error");
      }
    } else {
      res.status(500).send("not found the user");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const Logout = (_, res) => {
  res
    .cookie("token", "", { sameSite: "none", secure: true })
    .status(200)
    .send("logout well");
};
