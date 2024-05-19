import React from 'react'
import "../css/Sidebar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';
import axios from 'axios'
import { axiosinstant } from '../lib/axiosinstant';


function sidebar() {
  const [username,setUsername] = useState('') 
  const [accountBalance,setAccountBalance] = useState('')
  const [activeLink, setActiveLink] = useState(location.pathname);
  const isChartPath = location.pathname === '/';
  const isTradePath = location.pathname === '/Trading';
  const isSettingPath = location.pathname === '/Setting';
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstant.get('Account/getBalance');
        setAccountBalance(response.data.usdt);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    // const fetchUsername = async () => {
    //   try {
    //     const response = await axiosinstant.get('checkToken');
    //     setUsername(response.data.username);
    //   } catch (error) {
    //     console.error('Error fetching username: ', error);
    //   }
    // };

    fetchData();
    // fetchUsername();
  }, []);

  return (
    <div>
      <div className='sdbar_bg'></div>
      <div className='sdbar'>
        <div className='text_name'> {username} </div>
        <div className='acc_balance'> Account Balance</div>
        <div className='dollar_balance'>{accountBalance} $ </div>
        <div className='chart_box'>
          <Link to="/" className={`chart ${activeLink === '/' ? 'active' : ''}`}>
            Chart
          </Link>
          <div className={`chart_bg ${isChartPath ? '' : 'hidden'}`}>
            <div className='tag_yellow'></div>
          </div>
          
        </div>
        <div className='trade_box'>
          <Link to="/Trading" className={`trade ${activeLink === '/Trading' ? 'active' : ''}`}>
            Trading
          </Link>
          <div className={`trade_bg ${isTradePath ? '' : 'hidden'}`}>
            <div className='tag_yellow'></div>
          </div>
        </div>
        <div className='setting_box'>
          <Link to="/Setting" className={`setting ${activeLink === '/Setting' ? 'active' : ''}`}>
            Setting
          </Link>
          <div className={`setting_bg ${isSettingPath ? '' : 'hidden'}`}>
            <div className='tag_yellow'></div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default sidebar