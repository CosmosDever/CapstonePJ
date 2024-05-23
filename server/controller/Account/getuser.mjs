import jwt from "jsonwebtoken";
import { secret } from "../../src/server.mjs";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
export const getuser = async (req, res) => {
  try {
    const token = localStorage.getItem("localtoken");
    console.log(token);
    if (!token) {
      return res.status(200).send({ message: "not token" });
    }
    const decode = jwt.verify(token, secret);
    // console.log(decode);
    const username = decode.ctoken.username;
    res.status(200).send({ message: "have token", username: username });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
