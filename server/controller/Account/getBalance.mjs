import { Config } from "../../lib/Config.mjs";
import { MainClient } from "binance";

const API_KEY = Config.BNB_API_KEY;
const API_SECRET = Config.BNB_API_SECRET;

const client = new MainClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const fetchBalances = async (req, res) => {
  try {
    const coin = await client.getBalances();
    const usdt = coin.filter((res) => res.coin === "USDT");
    const btc = coin.filter((res) => res.coin === "BTC");
    res.send({ usdt: usdt[0].free, btc: btc[0].free });
  } catch (error) {
    console.log(error);
  }
};
