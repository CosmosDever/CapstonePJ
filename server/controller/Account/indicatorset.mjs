import { client, connectDB } from "../../src/server.mjs";

export const setindicator = async (req, res) => {
  try {
    await connectDB();
    const { username, indicator } = req.body;
    const updatedAccount = await client
      .db("CapSTData")
      .collection("Account")
      .findOneAndUpdate(
        { "accuser.username": username },
        { $set: { "accsetting.indicator": indicator } },
        { returnOriginal: false }
      );

    if (!updatedAccount) {
      return res.status(200).send({ error: "Account not found" });
    }

    res.send({ massage: "indicator was set" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
