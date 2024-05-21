import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Trading.css";
import Sidebar from "../Components/Sidebar";
import { Icon } from '@iconify/react';
import { axiosinstant } from "../lib/axiosinstant";


function Trading() {
    const [price,setPrice] = useState('')
    const [btchigh,setBtchigh] = useState('')
    const [btclow,setBtclow] = useState('')
    const [btcvol,setBtcvol] = useState('')
    const [btcusdt,setBtcusdt] = useState('')
    const [quantity,setQuantity] = useState(0)
    const [adx,setAdx] = useState(0)
    const [rsi,setRsi] = useState(0)
    const [sma,setSma] = useState(0)
    const [atr,setAtr] = useState(0)
    const [orders, setOrders] = useState([]);


    const handleSliderChange = (event) => {
            setQuantity(event.target.value);
    };

    const Indicator_submit =async(e)=> {
        e.preventDefault()
        try {
            const response = await axiosinstant.post('Account/setindicator', {
                username: "test",
                indicator :
                {
                    "ATR": atr,
                    "ADX": adx,
                    "RSI": rsi,
                    "SMA": sma,
                    "amount": quantity,
                    "state" : "activate"
                }
            });
            console.log('setindicator success')
            // console.log(response.data)
            // เพิ่มโค้ดเพื่อประมวลผลการตอบกลับจากเซิร์ฟเวอร์ที่คุณต้องการทำต่อไป
          } catch (error) {
            console.error('Error posting data: ', error);
          }
    }

    const convertTimestampToThaiTime = (timestamp) => {
        let date = new Date(timestamp);
        date.setHours(date.getHours()); 
        return date.toLocaleString('th-TH', {
          timeZone: 'Asia/Bangkok',
          hour12: false
        });
      };

      const fetchHistory = async () => {
        try {
            const response = await axiosinstant.get('BuySell/GetOrder');
            const ordersData = response.data.map((order, index, array) => {
                const calculateProfitLoss = (buyPrice, sellPrice) => {
                    const netProfitLoss = sellPrice - buyPrice;
                    const profitLossPercentage = (netProfitLoss / buyPrice) * 100;
                    return profitLossPercentage.toFixed(2);
                };

                const currentPrice = parseFloat(order.price);
                const previousPrice = index > 0 ? parseFloat(array[index - 1].price) : currentPrice;

                return {
                    id: order.orderId,
                    buy_sell: order.side,
                    quantity: parseFloat(order.origQty), // Formatting quantity to 2 decimal places
                    time: convertTimestampToThaiTime(order.time),
                    price: currentPrice.toFixed(2), // Formatting price to 2 decimal places
                    profitLoss: calculateProfitLoss(previousPrice, currentPrice) // Calculate profit/loss using the previous price and current price
                };
            });
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching order history: ', error);
        }
    };
    const fetchPrice = async () => {
        try {
        const response = await axiosinstant.get('BuySell/Get24hStatististics');
        setPrice(response.data[0].openPrice);
        setBtchigh(response.data[0].highPrice);
        setBtclow(response.data[0].lowPrice);
        setBtcvol(response.data[0].volumeBTC);
        setBtcusdt(response.data[0].volumeUSDT);
        
        } catch (error) {
        console.error('Error fetching Price: ', error);
        }
    };
    const fetchIndicator = async () => {
        try {
            const response = await axiosinstant.post('Account/getindicator',{
                username: "test",
            })
            setQuantity(response.data.accsetting.indicator.amount);
            setAdx(response.data.accsetting.indicator.ADX);
            setRsi(response.data.accsetting.indicator.RSI);
            setSma(response.data.accsetting.indicator.SMA);
            setAtr(response.data.accsetting.indicator.ATR);
            
            } catch (error) {
            console.error('Error fetching Price: ', error);
            }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPrice();
                await fetchIndicator();
                await fetchHistory();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchData();
    }, []);
    
   


    return (
        <> 
        <Sidebar/>
        <div className="background" >
            <div className="box_container">
                <div className="header">
                    <div className="price">
                        <div className="price_box">
                            <div className="price_text">Price</div>
                            <div className="btc_price"> {price} USDT</div>    
                        </div>
                    </div>
                    <div className="high">
                        <div className="high_box">
                            <div className="high_text">24h High</div>
                            <div className="btc_high"> {btchigh} USDT</div>
                        </div>
                    </div>
                    <div className="low">
                        <div className="low_box">
                            <div className="low_text">24h Low</div>
                            <div className="btc_low"> {btclow} USDT</div>
                        </div>
                    </div>
                    <div className="vol">
                        <div className="vol_box">
                            <div className="vol_text">24hVol (BTC)</div>
                            <div className="btc_vol"> {btcvol} BTC</div>
                        </div>
                    </div>
                    <div className="hour">
                        <div className="hour_box">
                            <div className="hour_text">24h (USDT)</div>
                            <div className="btc_usdt"> {btcusdt} USDT</div>
                        </div> 
                    </div>
                </div>
                <div className="container_trade">
                    <form onSubmit={(e)=>Indicator_submit(e)} className="indicator_box">
                        <div className="indicator_text">Indicator</div>
                        <div className="quantity">
                            <div className="quantity_text">Quantity</div>
                            <div className="plusbox">
                                <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                                <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                                <input className="quantity_box" type="number" value={quantity} onChange={(e)=>(setQuantity(e.target.value))}/>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={quantity}
                                    onChange={handleSliderChange}
                                    className="slider"
                                />
                            </div>
                        </div>
                        <div className="quantity_text">ADX</div>
                        <div className="plusbox">
                                <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                                <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                                <input className="adx_box" type="number" value={adx} onChange={(e)=>(setAdx(e.target.value))}/>
                        </div>
                        <div className="quantity_text">RSI</div>
                        <div className="plusbox">
                                <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                                <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                                <input className="rsi_box" type="number" value={rsi} onChange={(e)=>(setRsi(e.target.value))}/>
                        </div>
                        <div className="quantity_text">SMA</div>
                        <div className="plusbox">
                                <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                                <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                                <input className="sma_box" type="number" value={sma} onChange={(e)=>(setSma(e.target.value))}/>
                        </div>        
                        <div className="quantity_text">ATR</div>
                        <div className="plusbox">
                                <Icon className="plus_icon" icon="mdi:plus" width="32" height="32" />
                                <Icon className="minus_icon" icon="ic:baseline-minus" width="32" height="32" />
                                <input className="atr_box" type="number" value={atr} onChange={(e)=>(setAtr(e.target.value))}/>
                        </div>
                        <button type="submit" className="submit_box">Submit</button>
                    </form>

                    <div className="history_box">

                        <div className="history_text">Transaction History</div>
                        <div className="header_history">
                            <div>Id</div>
                            <div className="buy_text">Buy/Sell</div>
                            <div className="amount_text">Amount</div>
                            <div>Date</div>
                            <div>Price</div>
                            <div>Profit/loss</div>
                        </div>
                        <div className="container_his">
                                {orders.slice().reverse().map((order, index) => (
                                    <div key={index} className="order_item">
                                        <div>{order.id}</div>
                                        <div>{order.buy_sell}</div>
                                        <div>{order.quantity} BTC</div>
                                        <div>{order.time}</div>
                                        <div>{order.price} USDT</div>
                                        <div>{order.profitLoss}%</div>
                                    </div>
                                ))}
                        </div>
                </div>
            </div>       
                
                
            </div> 
        </div>
        </>
    )

}

export default Trading