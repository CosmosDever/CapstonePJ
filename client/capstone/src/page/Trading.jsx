import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Sidebar from "../component/sidebar";
export default function Trading() {
  const [userfrom, setUserfrom] = useState({
    username: "",
  });
  const [pricedata, setPricedata] = useState({
    openPrice: 0,
    priceChangePercent: 0,
    highPrice: 0,
    lowPrice: 0,
    volumeBTC: 0,
    volumeUSD: 0,
  });
  const [indicator, setIndicator] = useState({
    ATR: 14,
    ADX: 14,
    RSI: 14,
    SMA: 25,
    amount: 25,
    state: "deactivate",
  });
  useEffect(() => {
    async function checkToken() {
      try {
        await axiosInstance.get("/checkToken").then((response) => {
          if (response.data.message !== "have token") {
            window.location.href = "/signin";
          }
          setUserfrom({
            username: response.data.token.ctoken.username,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    checkToken();
  });
  useEffect(() => {
    async function getPrice() {
      try {
        const response = await axiosInstance.get("BuySell/Get24hStatististics");
        setPricedata({
          openPrice: response.data[0].openPrice,
          priceChangePercent: response.data[0].priceChangePercent,
          highPrice: response.data[0].highPrice,
          lowPrice: response.data[0].lowPrice,
          volumeBTC: response.data[0].volumeBTC,
          volumeUSD: response.data[0].volumeUSD,
        });
      } catch (error) {
        console.log(error);
      }
    }
    async function getIndicator() {
      try {
        const response = await axiosInstance.post("Account/getindicator", {
          username: userfrom.username,
        });
        setIndicator({
          ATR: response.data.accsetting.indicator.ATR,
          ADX: response.data.accsetting.indicator.ADX,
          RSI: response.data.accsetting.indicator.RSI,
          SMA: response.data.accsetting.indicator.SMA,
          amount: response.data.accsetting.indicator.amount,
          state: response.data.accsetting.indicator.state,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getIndicator();

    getPrice();
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#776212] via-[#171A1E] to-[#100F4A] w-screen h-screen flex items-center justify-between">
      <Sidebar />
      <div className="flex-1 flex w-full h-full items-center justify-center">
        <div className="w-11/12 h-5/6 flex-col  flex  bg-white  bg-opacity-15">
          <div className="w-full h-1/5 flex flex-row items-center justify-between   bg-white bg-opacity-10 ">
            <div
              id="Price"
              className="w-1/6 h-3/5 flex content-center ml-5 items-center justify-center bg-black bg-opacity-10 text-white "
            >
              Price
            </div>
            <div
              id="Price"
              className="w-1/6 h-3/5 flex content-center  items-center justify-center bg-black bg-opacity-10 text-white "
            >
              24h High
            </div>
            <div
              id="Price"
              className="w-1/6 h-3/5 flex content-center  items-center justify-center bg-black bg-opacity-10 text-white "
            >
              24 Low
            </div>
            <div
              id="Price"
              className="w-1/6 h-3/5 flex content-center  items-center justify-center bg-black bg-opacity-10 text-white "
            >
              24hVol (BTC)
            </div>
            <div
              id="Price"
              className="w-1/6 h-3/5 flex content-center mr-5  items-center justify-center bg-black bg-opacity-10 text-white "
            >
              priceChangePercent
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
