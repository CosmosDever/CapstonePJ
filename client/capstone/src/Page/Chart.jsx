// TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';
import '../css/Chart.css'; // Import CSS for styling (assuming this file exists)
import Sidebar from '../Components/Sidebar'; // Assuming Sidebar component is used elsewhere

function Chart() {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "1520",
      "height": "1000",
      "autosize": true,
      "symbol": "BITSTAMP:BTCUSD",
      "interval": "D",
      "timezone": "Asia/Bangkok",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "allow_symbol_change": true,
      "calendar": false,
      
      "support_host": "https://www.tradingview.com"
    });

    container.current.appendChild(script);

    return () => {
      // Clean up: remove the script when component unmounts
      container.current.removeChild(script);
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <>
    <Sidebar />
    <div className="background">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Chart
