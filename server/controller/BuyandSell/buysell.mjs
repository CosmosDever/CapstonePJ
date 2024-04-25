import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
export const buysellorder = async (req, res) => {
  try {
    if (req.body.recommendation == "buy") {
      try {
        const client = new MainClient({
          api_key: localStorage.getItem("API_KEY"),
          api_secret: localStorage.getItem("API_SECRET"),
        });
        const coin = await client.getBalances();
        const usdt = coin.filter((res) => res.coin === "USDT");
        if (usdt[0].free < req.body.amount) {
          res.send("buyerror not enough usdt");
          console.log("buyerror not enough usdt");
          return;
        }
        client
          .submitNewOrder({
            symbol: "BTCUSDT",
            side: "BUY",
            type: "MARKET",
            quantity: req.body.amount,
          })
          .then(() => {
            res.send("buysuccess");
            console.log("buysuccess");
          })
          .catch((error) => {
            console.error("Error in submitNewOrderBUY:", error);
            res.status(500).send("buyerror");
          });
      } catch (error) {
        console.error("Error creating MainClient:", error);
        res.status(500).send("clienterror");
      }
    }

    if (req.body.recommendation == "sell") {
      try {
        const client = new MainClient({
          api_key: localStorage.getItem("API_KEY"),
          api_secret: localStorage.getItem("API_SECRET"),
        });
        client
          .submitNewOrder({
            symbol: "BTCUSDT",
            side: "SELL",
            type: "MARKET",
            quantity: req.body.amount,
          })
          .then(() => {
            res.send("sellsuccess");
            console.log("sellsuccess");
          })
          .catch((error) => {
            console.error("Error in submitNewOrderSELL:", error);
            res.status(500).send("sellerror");
          });
      } catch (error) {
        console.error("Error creating MainClient:", error);
        res.status(500).send("clienterror");
      }
    }
    if (req.body.recommendation == "wait") {
      res.send("wait");
      console.log("wait");
    }
  } catch (error) {
    console.log(error);
  }
};
