import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./scratch");

export const getorder = async (req, res) => {
  try {
    if (
      localStorage.getItem("API_KEY") === "" ||
      localStorage.getItem("API_SECRET ") === ""
    ) {
      return res.status(200).send("API not found");
    }
    const client = new MainClient({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });

    const order = await client.getAllOrders({ symbol: "BTCUSDT" });

    console.log(order);

    res.status(200).send(order);
  } catch (error) {
    res.status(200).send({ massege: "API not found" });
  }
};
