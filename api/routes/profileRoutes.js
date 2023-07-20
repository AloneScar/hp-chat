import express from "express";

const router = express.Router();

const helloworld = (req, res) => {
  res.send('helloworld')
}

router.route("/").get(helloworld)

export default router;
