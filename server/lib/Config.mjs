import dotenv from "dotenv";
dotenv.config();
export const Config = {
  PORT: process.env.PORT,
  MONGODBurl: process.env.MONGODBurl,
  GMAIL: process.env.GMAIL,
  GMAIL_PWD: process.env.GMAIL_PWD,
};
