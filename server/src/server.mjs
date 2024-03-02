import express from "express";
import { Config } from "../lib/Config.mjs";
import accountRouter from "../router/account.mjs";
import buysellRouter from "../router/buyandsell.mjs";
import { MongoClient } from "mongodb";
const app = express();
app.use(express.json());
export const secret = "HS256";
const PORT = Config.PORT;
const mongoURI = Config.MONGODBurl;
export const client = new MongoClient(mongoURI);
export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error", e);
  }
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/Account", accountRouter);
app.use("/BuySell", buysellRouter);

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
// node --watch ./src/server.mjs
