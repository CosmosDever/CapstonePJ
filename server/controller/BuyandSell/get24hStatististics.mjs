import { MainClient } from "binance";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
const formatVolumeUSDT = (volume) => {
  const billion = 1000000000;
  const million = 1000000;
  if (volume >= billion) {
    return (volume / billion).toFixed(2) + "B";
  } else if (volume >= million) {
    return (volume / million).toFixed(2) + "M";
  } else {
    return volume.toFixed(2);
  }
};
export const get24hStatististics = async (req, res) => {
  try {
    const client = new MainClient({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });

    const coinStatististics = await client.get24hrChangeStatististics({
      symbol: "BTCUSDT",
    });
    const coinStatisticsArray = Array.isArray(coinStatististics)
      ? coinStatististics
      : [coinStatististics];
    const coinStatististicsres = coinStatisticsArray.map((res) => {
      return {
        symbol: res.symbol,
        openPrice: String(parseFloat(res.openPrice).toFixed(2)),
        priceChangePercent: String(
          parseFloat(res.priceChangePercent).toFixed(2)
        ),
        highPrice: String(parseFloat(res.highPrice).toFixed(2)),
        lowPrice: String(parseFloat(res.lowPrice).toFixed(2)),
        volumeBTC: String(parseFloat(res.volume).toFixed(2)),
        volumeUSDT: String(formatVolumeUSDT(res.volume * res.openPrice)),
      };
    });
    res.send(coinStatististicsres);
  } catch (error) {
    res.status(200).send({ massege: "API not found" });
  }
};
