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
      res.status(200).json({ message: "email not exist" });
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
      res.status(200).json({ message: "otp not send" });
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
      // text: "OPT to change password is " + String(RandomNumber),
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title></title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #333;
      background-color: #fff;
    }

    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      padding: 0 0px;
      padding-bottom: 10px;
      border-radius: 5px;
      line-height: 1.8;
    }

    .header {
      border-bottom: 1px solid #eee;
    }

    .header a {
      font-size: 1.4em;
      color: #000;
      text-decoration: none;
      font-weight: 600;
    }

    .content {
      min-width: 700px;
      overflow: auto;
      line-height: 2;
    }

    .otp {
      background: linear-gradient(to right, #171A1E 0, #776212 50%, #E2B000 100%);
      margin: 0 auto;
      width: max-content;
      padding: 0 10px;
      color: #fff;
      border-radius: 4px;
    }

    .footer {
      color: #aaa;
      font-size: 0.8em;
      line-height: 1;
      font-weight: 300;
    }

    .email-info {
      color: #666666;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      padding-bottom: 6px;
    }

    .email-info a {
      text-decoration: none;
      color: #00bc69;
    }
  </style>
</head>

<body>

  <div class="container">
 
   
    <p>
    
      <br />
      <b>Your One-Time Password (OTP) verification code is:</b>
    </p>
    <h2 class="otp">${RandomNumber}</h2>
    <p style="font-size: 0.9em">
  
    
      If you did not initiate this request, please disregard this
      message. Please ensure the confidentiality of your OTP and do not share
      it with anyone.<br />
      <strong>Do not forward or give this code to anyone.</strong>
      <br />
      <br />
      <strong>Thank you for using Profit Oriented Dynamic Bot .</strong>
      <br />
      <br />
      Best regards,
      <br />
      <strong>PODB Compony</strong>
    </p>

    <hr style="border: none; border-top: 0.5px solid #131111" />
    <div class="footer">
      <p>This email can't receive replies.</p>
      
    </div>
  </div>
  <div style="text-align: center">
    <div class="email-info">
      <span>
        This email was sent to 
        <a href="mailto:${email}">${email}</a>
      </span>
    </div>
   
    <div class="email-info">
      &copy; 2024 PODB Compony. All rights
      reserved.
    </div>
  </div>
</body>
`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "email send" });
  } catch (error) {
    console.log("Error", error);
  }
};
