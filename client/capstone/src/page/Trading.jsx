import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Sidebar from "../component/sidebar";
import { Slider } from "rsuite";

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
    ATR: 0,
    ADX: 0,
    RSI: 0,
    SMA: 0,
    amount: 0,
    state: "",
  });
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await axiosInstance.get("/checkToken");
        if (response.data.message !== "have token") {
          window.location.href = "/signin";
        }
        setUserfrom({
          username: response.data.token.ctoken.username,
        });
      } catch (error) {
        console.log(error);
      }
    }
    checkToken();
  }, []);

  const Indicator_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("Account/setindicator", {
        username: userfrom.username,
        indicator: {
          ATR: indicator.ATR,
          ADX: indicator.ADX,
          RSI: indicator.RSI,
          SMA: indicator.SMA,
          amount: indicator.amount,
          state: "activate",
        },
      });
      setIndicator((prev) => ({ ...prev, state: "activate" }));
      console.log("setindicator success");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  const Indicator_deactivate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("Account/setindicator", {
        username: userfrom.username,
        indicator: {
          ATR: indicator.ATR,
          ADX: indicator.ADX,
          RSI: indicator.RSI,
          SMA: indicator.SMA,
          amount: indicator.amount,
          state: "deactivate",
        },
      });
      setIndicator((prev) => ({ ...prev, state: "deactivate" }));
      console.log("setindicator success");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

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
    async function getTransaction() {
      try {
        const response = await axiosInstance.get("BuySell/GetOrder");
        setTransaction(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchData() {
      setLoading(true);
      await getIndicator();
      await getPrice();
      await getTransaction();
      setLoading(false);
    }

    if (userfrom.username) {
      fetchData();
    }

    const intervalId = setInterval(getPrice, 5000);

    return () => clearInterval(intervalId);
  }, [userfrom.username]);

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-[#776212] via-[#171A1E] to-[#100F4A] w-screen h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-[#776212] via-[#171A1E] to-[#100F4A] w-screen h-screen flex items-center justify-between">
      <Sidebar />
      <div className="flex-1 flex w-full h-full items-center justify-center">
        <div className="w-11/12 h-5/6 flex-col flex ">
          <div className="w-full h-1/5 flex flex-row  items-center justify-between ">
            <div
              id="Price"
              className="ml-5 w-1/6 h-3/5 flex rounded-2xl content-center items-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 text-[10px] lg:text-xl ">
                <div>Price</div>
                <div className="text-[10px] lg:text-xl">
                  {pricedata.openPrice}$
                </div>
              </div>
            </div>
            <div
              id="highPrice"
              className="w-1/6 h-3/5 flex rounded-2xl content-center items-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 text-[10px] lg:text-xl">
                <div>24 High</div>
                <div className="text-[10px] lg:text-xl">
                  {pricedata.highPrice}$
                </div>
              </div>
            </div>
            <div
              id="lowPrice"
              className="w-1/6 h-3/5 flex rounded-2xl content-center items-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 text-[10px] lg:text-xl">
                <div>24 Low</div>
                <div className="text-[10px] lg:text-xl">
                  {pricedata.lowPrice}$
                </div>
              </div>
            </div>
            <div
              id="volumeBTC"
              className="w-1/6 h-3/5 flex rounded-2xl content-center items-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 text-[10px] lg:text-lg">
                <div>Volume BTC</div>
                <div className="text-[10px] lg:text-lg">
                  {pricedata.volumeBTC} BTC
                </div>
              </div>
            </div>
            <div
              id="priceChangePercent"
              className="w-1/6 h-3/5 flex rounded-2xl content-center mr-5 items-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 text-[10px] lg:text-lg">
                <div>Change Percent</div>
                <div className=" text-[10px] lg:text-lg">
                  {pricedata.priceChangePercent}%
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-row justify-between">
            <div
              id="indicator"
              className="w-5/12 h-full flex flex-col rounded-2xl justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5">
                <div className="text-2xl">Indicator</div>
                <form
                  onSubmit={
                    indicator.state === "activate"
                      ? Indicator_deactivate
                      : Indicator_submit
                  }
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <label htmlFor="Quantity">Quantity</label>
                      <div className="bg-white bg-opacity-10 rounded-2xl h-12 flex items-center ">
                        <span className="text-xl p-5 ">{indicator.amount}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max="100"
                        value={indicator.amount}
                        className="range range-xs [--range-shdw:#D1AD1F]"
                        step="5"
                        id="Quantity"
                        name="Quantity"
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            amount: e.target.value,
                          })
                        }
                      />
                      <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                      </div>
                      <div className="w-full flex justify-between text-xs px-2">
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                      </div>
                      <label htmlFor="ATR" className="pt-2">
                        ATR
                      </label>
                      <input
                        type="number"
                        id="ATR"
                        name="ATR"
                        className="bg-white bg-opacity-10 rounded-2xl h-11 text-xl p-5"
                        value={indicator.ATR}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            ATR: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="ADX" className="pt-2">
                        ADX
                      </label>
                      <input
                        type="number"
                        id="ADX"
                        name="ADX"
                        className="bg-white bg-opacity-10 rounded-2xl h-11 text-xl p-5"
                        value={indicator.ADX}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            ADX: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="RSI" className="pt-2">
                        RSI
                      </label>
                      <input
                        type="number"
                        id="RSI"
                        name="RSI"
                        className="bg-white bg-opacity-10 rounded-2xl h-11 text-xl p-5"
                        value={indicator.RSI}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            RSI: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="SMA" className="pt-2">
                        SMA
                      </label>
                      <input
                        type="number"
                        id="SMA"
                        name="SMA"
                        className="bg-white bg-opacity-10 rounded-2xl h-11 text-xl p-5"
                        value={indicator.SMA}
                        onChange={(e) =>
                          setIndicator({
                            ...indicator,
                            SMA: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-row w-full">
                      {indicator.state === "activate" ? (
                        <div className="flex items-center justify-center w-full ">
                          <button className="w-3/5 pt-5" type="submit">
                            <div className="bg-red-500 hover:bg-red-600 rounded-2xl h-11 text-xl flex items-center justify-center">
                              Deactivate
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full ">
                          <button className="w-3/5 pt-5" type="submit">
                            <div className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl h-11 text-xl flex items-center justify-center">
                              Activate
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              id="transaction"
              className="w-6/12 h-full flex flex-col rounded-2xl content-center justify-start bg-black bg-opacity-10 text-white"
            >
              <div className="p-5 ">
                <div className="text-2xl">Transection History</div>
                <div className="w-full flex justify-between text-xs px-2 py-2">
                  <span>id</span>
                  <span>Amount</span>
                  <span>Date</span>
                  <span>Price</span>
                  <span>Profit/Lose</span>
                </div>
                {transaction.length > 0 ? (
                  {
                    ...transaction.map((item) => (
                      <div
                        className="w-full flex justify-between text-xs px-2 py-2"
                        key={item.id}
                      >
                        <span>{item.id}</span>
                        <span>{item.amount}</span>
                        <span>{item.date}</span>
                        <span>{item.price}</span>
                        <span>{item.profit}</span>
                      </div>
                    )),
                  }
                ) : (
                  <div className="w-full flex justify-between text-xs px-2 py-2">
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
