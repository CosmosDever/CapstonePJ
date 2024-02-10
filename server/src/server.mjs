import express from "express";
import { Config } from "../lib/Config.mjs";
import accountRouter from "../router/account.mjs";
const app = express();
const PORT = Config.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/Account", accountRouter);

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
// node --wacth ./src/server.js
