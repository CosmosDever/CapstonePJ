import { client, connectDB } from "../../src/server.mjs";
import nodemailer from "nodemailer";

export const send_otp = async (req, res) => {
  try {
    const { email } = req.body;
    await connectDB();
    const findEmail = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({ "accuser.email": email });
    if (!findEmail) {
      res.status(400).json({ message: "email not exist" });
      return false;
    }

    const RandomNumber = Math.floor(Math.random() * 900000 + 100000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mahatomahato45@gmail.com",
        pass: "mahato10097",
      },
    });
    const mailOptions = {
      from: "mahatomahato45@gmail.com",
      to: "mahatomahato46@gmail.com",
      subject: "OPT to change password",
      text: "OPT to change password is " + String(RandomNumber),
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "update success" });
  } catch (error) {
    console.log("Error", error);
  }
};
