import React from 'react'
import "../css/Sidebar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';
import axios from 'axios'


function sidebar() {
  const [username,setUsername] = useState('') 
  const [accountBalance,setAccountBalance] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3605/Account/getBalance');
        setAccountBalance(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='sdbar_bg'></div>
      <div className='sdbar'>
        <div className='text_name'> Poomthai Promgote </div>
        <div className='acc_balance'> Account Balance</div>
        <div className='dollar_balance'>{accountBalance} $ </div>
       
        <Icon className='chart_icon' icon="lets-icons:candlestick" width="30" height="30" />
        <Link to ="/" className='chart'> Chart</Link>
        
        <Icon className='trade_icon' icon="ph:chart-line" width="30" height="30" />
        <Link to ="/Trading" className='trade'>  Trading </Link>
        
        <Icon className='setting_icon' icon="ep:setting" width="25" height="25"  /> 
        <Link to ="/Setting" className='setting'>Setting  </Link>
      </div>
      <div></div>
    </div>
  )
}

export default sidebar