import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Trading.css";
import Sidebar from "../Components/Sidebar";
import { Icon } from '@iconify/react';


function Trading() {
    const [value, setValue] = useState(50);

    const handleSliderChange = (event) => {
        setValue(event.target.value);
    };
    const [price,setPrice] = useState('')
    const [btchigh,setBtchigh] = useState('')
    const [btclow,setBtclow] = useState('')
    const [btcvol,setBtcvol] = useState('')
    const [btcusdt,setBtcusdt] = useState('')
    const [quantity,setQuantity] = useState('')
    const [adx,setAdx] = useState('')
    const [rsi,setRsi] = useState('')
    const [sma,setSma] = useState('')
    const [atr,setAtr] = useState('')
    

    useEffect(() => {
        const fetchPrice = async () => {
            try {
            const response = await axios.get('http://localhost:3605/BuySell/Get24hStatististics');
            setPrice(response.data.openPrice);
            setBtchigh(response.data.highPrice);
            setBtclow(response.data.lowPrice);
            setBtcvol(response.data.volumeBTC);
            setBtcusdt(response.data.volumeUSDT);
            
            } catch (error) {
            console.error('Error fetching Price: ', error);
            }
        };

        const fetchIndicator = async () => {
            try {
                const response = await axios.get('http://localhost:3605/Account/getindicator');
                setQuantity(response.data.amount);
                setAdx(response.data.ADX);
                setRsi(response.data.RSI);
                setSma(response.data.SMA);
                setAtr(response.data.ATR);
                
                } catch (error) {
                console.error('Error fetching Price: ', error);
                }
        }
        
        
        fetchPrice();
        fetchIndicator();
    }, []);

    return (
        <> 
        <Sidebar/>
        <div className="background" >
            <div className="header">
                <div className="price">
                    <div className="price_box"></div>
                    <div className="price_text">Price</div>
                    <div className="btc_price">${price} </div>
                </div>
                <div className="high">
                    <div className="high_box"></div>
                    <div className="high_text">24h High</div>
                    <div className="btc_high">${btchigh}</div>
                </div>
                <div className="low">
                    <div className="low_box"></div>
                    <div className="low_text">24h Low</div>
                    <div className="btc_low">${btclow}</div>
                </div>
                <div className="vol">
                    <div className="vol_box"></div>
                    <div className="vol_text">24hVol (BTC)</div>
                    <div className="btc_vol">${btcvol}</div>
                </div>
                <div className="hour">
                    <div className="hour_box"></div>
                    <div className="hour_text">24h (USDT)</div>
                    <div className="btc_usdt">${btcusdt}</div>
                </div>
            </div>
            <div className="indicator_box">
                <div className="indicator_text">Indicator</div>
                <div className="quantity">
                    <div className="quantity_text">Quantity</div>
                    <div className="plusbox">
                        <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                        <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                        <input className="quantity_box" value={quantity}/>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                    </div>
                </div>
                <div className="quantity_text">ADX</div>
                <div className="plusbox">
                        <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                        <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                        <input className="adx_box" value={adx}/>
                </div>
                <div className="quantity_text">RSI</div>
                <div className="plusbox">
                        <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                        <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                        <input className="rsi_box" value={rsi}/>
                </div>
                <div className="quantity_text">SMA</div>
                <div className="plusbox">
                        <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                        <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                        <input className="sma_box" value={sma}/>
                </div>        
                <div className="quantity_text">ATR</div>
                <div className="plusbox">
                        <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                        <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                        <input className="atr_box"value={atr}/>
                </div>
                <button className="submit_box">Submit</button>
            </div>

            <div className="history_box">
                <div className="history_text">Transection History</div>
            </div>
        </div>
        </>
    )

}

export default Trading