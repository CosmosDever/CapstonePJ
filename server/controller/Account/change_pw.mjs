import { hashPassword } from "../../lib/PasswordManagement.mjs";
import { client, connectDB } from "../../src/server.mjs";
export const change_pw = async (req, res) => {
  try {
    const { email, password } = req.body;
    await connectDB();
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({
        "accuser.email": email,
      });
    if (!findEmail) {
      res.status(400).json({ message: "email not exist" });
      return false;
    }
    const updatepw = {
      accuser: {
        password: await hashPassword(password),
      },
    };
    await client
      .db("CapSTData")
      .collection("Account")
      .updateOne({ "accuser.email": email }, { $set: updatepw });
    res.status(201).json({ message: "update success" });
    await client.close();
  } catch (error) {
    console.log("Error", error);
  }
};
