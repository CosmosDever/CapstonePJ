import dotenv from "dotenv";
dotenv.config();
export const Config = {
  PORT: process.env.PORT,
  BNB_API_KEY: process.env.BNB_API_KEY,
  BNB_API_SECRET: process.env.BNB_API_SECRET,
};
