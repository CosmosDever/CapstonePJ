import { client, connectDB } from "../../src/server.mjs";
import { hashPassword } from "../../lib/PasswordManagement.mjs";

export const change_pwd = async (req, res) => {
  try {
    const { email, password } = req.body;
    await connectDB();
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({ "accuser.email": email });
    if (!findEmail) {
      res.status(200).json({ message: "email not exist" });
      return false;
    }
    const updatePassword = await client
      .db("CapSTData")
      .collection("Account")
      .updateOne(
        { "accuser.email": email },
        { $set: { "accuser.password": await hashPassword(password) } }
      );
    if (!updatePassword) {
      res.status(200).json({ message: "password not update" });
      return false;
    }
    res.status(201).json({ message: "password update" });
  } catch (error) {
    console.log("Error", error);
  }
};
