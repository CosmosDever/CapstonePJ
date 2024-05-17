import { client, connectDB } from "../../src/server.mjs";
import nodemailer from "nodemailer";
import { Config } from "../../lib/Config.mjs";
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
    const send_otp = await client
      .db("CapSTData")
      .collection("OTP")
      .findOneAndUpdate(
        { email: email },
        { $set: { otp: RandomNumber } },
        { upsert: true }
      );

    if (!send_otp) {
      res.status(400).json({ message: "otp not send" });
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Config.GMAIL,
        pass: Config.GMAIL_PWD,
      },
    });
    const mailOptions = {
      from: Config.GMAIL,
      to: email,
      subject: "OPT to change password",
      text: "OPT to change password is " + String(RandomNumber),
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "email send" });
  } catch (error) {
    console.log("Error", error);
  }
};
