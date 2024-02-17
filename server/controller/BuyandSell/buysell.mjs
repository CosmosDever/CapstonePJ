import { MainClient } from "binance";
import { API_KEY, API_SECRET } from "../Account/getAPI.mjs";
export const buysellorder = async (req, res) => {
  try {
    if (req.body.buysell == "buy") {
      //   const client = new MainClient({
      //     api_key: API_KEY,
      //     api_secret: API_SECRET,
      //   });
      //   client.buy({
      //     symbol: "BTCUSDT",
      //     side: "BUY",
      //     type: "MARKET",
      //     quantity: req.body.amount,
      //   });
      res.send("buysuccess");
    }
    if (req.body.buysell == "sell") {
      //   const client = new MainClient({
      //     api_key: API_KEY,
      //     api_secret: API_SECRET,
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
