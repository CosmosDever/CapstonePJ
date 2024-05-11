import jwt from "jsonwebtoken";
import { secret } from "../src/server.mjs";

export const checkToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "not token" });
    }
    const decode = jwt.verify(token, secret);
    res.status(200).send({ message: "have token", token: decode });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error });
  }
};
