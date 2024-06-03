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
      res.status(200).json({ message: "username already exist" });
      return false;
    }
    if (findEmail) {
      res.status(200).json({ message: "email already exist" });
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
          amount: 0.0,
          state: "deactivate",
        },
      },
    };
    await client.db("CapSTData").collection("Account").insertOne(createuser);
    res.status(200).json({ message: "signup success", createuser });
    await client.close();
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error });
    console.log("Error", error);
  }
};
