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
      accsetting: {},
    };
    await client.db("CapSTData").collection("Account").insertOne(createuser);
    res.status(201).json(createuser);
    await client.close();
  } catch (error) {
    console.log("Error", error);
  }
};
