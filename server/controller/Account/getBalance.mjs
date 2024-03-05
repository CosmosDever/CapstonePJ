import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
export const fetchBalances = async (req, res) => {
  try {
    if (
      localStorage.getItem("API_KEY") === null ||
      localStorage.getItem("API_SECRET") === null
    ) {
      res.send("Please set API_KEY and API_SECRET");
      return false;
    }
    const client = new MainClient({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });
    const coin = await client.getBalances();
    const usdt = coin.filter((res) => res.coin === "USDT");
    const btc = coin.filter((res) => res.coin === "BTC");
    res.send({ usdt: usdt[0].free, btc: btc[0].free });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
