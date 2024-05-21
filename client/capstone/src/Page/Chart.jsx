import React, { useEffect, useRef } from 'react';
import '../css/Chart.css'; // Import CSS for styling (assuming this file exists)
import Sidebar from '../Components/Sidebar'; // Assuming Sidebar component is used elsewhere
import { Icon } from '@iconify/react';

function Chart() {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({

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

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      // Clean up: remove the script when component unmounts
      if (container.current) {
        container.current.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <>
      <Sidebar />
      <div className="background">
        <div className='contain_chart'>
          <div className='bitcoin_box'>
            <Icon className='bitcoin_icon' icon="logos:bitcoin" width="32" height="32" />
            <div className='bitcoin_text'>Bitcoin</div>
            <div className='btc_text'>BTC</div>
          </div>
          <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;