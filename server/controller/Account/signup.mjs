import { client, connectDB } from "../../src/server.mjs";
import { hashPassword } from "../../lib/PasswordManagement.mjs";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await connectDB();
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({
        "accuser.email": email,
      });
    const findUsername = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({
        "accuser.username": username,
      });

    if (findUsername) {
      res.status(400).json({ message: "username already exist" });
      return false;
    }
    if (findEmail) {
      res.status(400).json({ message: "email already exist" });
      return false;
    }
    const createuser = {
      accuser: {
        email: email,
        username: username,
        password: await hashPassword(password),
      },
      accsetting: {
        indicator: {
          ATR: 14,
          ADX: 14,
          RSI: 14,
          SMA: 30,
          amount: 25,
          state: "deactivate",
        },
      },
    };
    await client.db("CapSTData").collection("Account").insertOne(createuser);
    res.status(201).json(createuser);
    await client.close();
  } catch (error) {
    console.log("Error", error);
  }
};
