import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
export const fetchBalances = async (req, res) => {
  try {
    const client = new MainClient({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });
    const coin = await client.getBalances();
    const usdt = coin.filter((res) => res.coin === "USDT");
    const btc = coin.filter((res) => res.coin === "BTC");
    res.send({ massege: "success", usdt: usdt[0].free, btc: btc[0].free });
  } catch (error) {
    res.status(200).send({ massege: "API not found" });
  }
};
