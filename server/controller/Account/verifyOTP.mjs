import { client, connectDB } from "../../src/server.mjs";
export const verifyOTP = async (req, res) => {
  try {
    await connectDB();
    const { email, otp } = req.body;
    const findEmail = await client
      .db("CapSTData")
      .collection("OTP")
      .findOne({ email: email });
    if (!findEmail) {
      res.status(200).json({ message: "email not exist" });
      return false;
    }
    if (findEmail.otp == otp) {
      const deleteOTP = await client
        .db("CapSTData")
        .collection("OTP")
        .deleteOne({ email: email });
      if (!deleteOTP) {
        res.status(200).json({ message: "otp not send" });
        return false;
      }
      res.status(200).json({ message: "verify success" });
    } else {
      res.status(200).json({ message: "otp not match" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};
