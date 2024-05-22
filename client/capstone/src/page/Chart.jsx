import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Sidebar from "../component/sidebar";
import "rsuite/dist/rsuite.min.css";

export default function Chart() {
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await axiosInstance.get("/checkToken");
        console.log(response.data.token.ctoken.username);
        if (response.data.message !== "have token") {
          setTokenValid(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkToken();
  }, []);

  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "BITSTAMP:BTCUSD",
      interval: "D",
      timezone: "Asia/Bangkok",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    if (container.current) {
      container.current.appendChild(script);
    }
    return () => {
      if (container.current) {
        container.current.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!tokenValid) {
      window.location.href = "/";
    }
  }, [tokenValid]);

  useEffect(() => {
    const intervalId = setInterval(500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#776212] via-[#171A1E] to-[#100F4A] w-screen h-screen flex justify-between">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="tradingview-widget-container" ref={container}></div>
      </div>
    </main>
  );
}
