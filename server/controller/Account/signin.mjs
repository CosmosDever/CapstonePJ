import { client, connectDB } from "../../src/server.mjs";
import { secret } from "../../src/server.mjs";
import jwt from "jsonwebtoken";
import { matchPassword } from "../../lib/PasswordManagement.mjs";
export const signin = async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({
        "accuser.username": username,
      });
    if (!findEmail) {
      res.status(400).json({ message: "username not found" });
      return false;
    }
    const MatchPassword = await matchPassword(
      password,
      findEmail.accuser.password
    );
    if (!MatchPassword) {
      res.status(400).json({ message: "password not match" });
      return false;
    }
    const payload = { findEmail };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "signin success", result: findEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};