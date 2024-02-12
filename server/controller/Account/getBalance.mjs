import { MainClient } from "binance";
import { API_KEY, API_SECRET } from "../Account/getAPI.mjs";

export const fetchBalances = async (req, res) => {
  try {
    const client = new MainClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    const coin = await client.getBalances();
    const usdt = coin.filter((res) => res.coin === "USDT");
    const btc = coin.filter((res) => res.coin === "BTC");
    res.send({ usdt: usdt[0].free, btc: btc[0].free });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" }); // Handle errors properly
  }
};
