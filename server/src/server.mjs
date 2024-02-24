import express from "express";
import { Config } from "../lib/Config.mjs";
import accountRouter from "../router/account.mjs";
import buysellRouter from "../router/buyandsell.mjs";
const app = express();
app.use(express.json());
const PORT = Config.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/Account", accountRouter);
app.use("/BuySell", buysellRouter);

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
// node --watch ./src/server.mjs
