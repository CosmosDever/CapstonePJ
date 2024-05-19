import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./scratch");

export const getorder = async (req, res) => {
  try {
    const client = new MainClient({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });

    const order = await client.getAllOrders({ symbol: "BTCUSDT" });

    console.log(order);

    res.status(200).send(order);
  } catch (error) {
    console.error("Error in getorder:", error);
    res.status(500).send("Error in getorder:", error);
  }
};
