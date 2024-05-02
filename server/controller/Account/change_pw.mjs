import { hashPassword } from "../../lib/PasswordManagement.mjs";
import { client, connectDB } from "../../src/server.mjs";
export const change_pw = async (req, res) => {
  try {
    const { email, password } = req.body;
    await connectDB();
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOneAndUpdate(
        { "accuser.email": email },
        { $set: { "accuser.password": await hashPassword(password) } }
      );
    if (!findEmail) {
      res.status(400).json({ message: "email not exist" });
      return false;
    }
    res.status(201).json({ message: "update success" });
  } catch (error) {
    console.log("Error", error);
  }
};
