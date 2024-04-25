
import { client, connectDB } from "../../src/server.mjs";

export const getindicator = async (req, res) => {
  try {
    await connectDB();
    const { username } = req.body;
    const getAccountindicator = await client
      .db("CapSTData")
      .collection("Account")
      .findOne({ "accuser.username": username });

    if (!getAccountindicator) {
      return res.status(404).send({ error: "Account not found" });
    }

    res.send(getAccountindicator);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};