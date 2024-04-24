import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
export const buysellorder = async (req, res) => {
  try {
    if (req.body.recommendation == "buy") {
      //   const client = new MainClient({
      //     api_key: localStorage.getItem("API_KEY"),
      //     api_secret: localStorage.getItem("API_SECRET"),
      //   });
      //   client.buy({
      //     symbol: "BTCUSDT",
      //     side: "BUY",
      //     type: "MARKET",
      //     quantity: req.body.amount,
      //   });
      res.send("buysuccess");
    }
    if (req.body.recommendation == "sell") {
      //   const client = new MainClient({
      //     api_key: localStorage.getItem("API_KEY"),
      //     api_secret: localStorage.getItem("API_SECRET"),
      //   });
      //   client.sell({
      //     symbol: "BTCUSDT",
      //     side: "SELL",
      //     type: "MARKET",
      //     quantity: req.body.amount,
      //   });
      res.send("sellsuccess");
    }
  } catch (error) {
    console.log(error);
  }
};
