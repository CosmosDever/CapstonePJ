import { client, connectDB } from "../../src/server.mjs";
import { secret } from "../../src/server.mjs";
import jwt from "jsonwebtoken";
import { matchPassword } from "../../lib/PasswordManagement.mjs";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
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
      res.status(200).json({ message: "username not found" });
      return false;
    }
    const MatchPassword = await matchPassword(
      password,
      findEmail.accuser.password
    );
    if (!MatchPassword) {
      res.status(200).json({ message: "password not match" });
      return false;
    }
    const ctoken = {
      ID: findEmail._id,
      username: findEmail.accuser.username,
      accsetting: findEmail.accsetting,
    };
    const payload = { ctoken };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    localStorage.setItem("localtoken", token);
    const localtoken = localStorage.getItem("localtoken");
    console.log(token);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "signin success", result: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
