import React from 'react'
import "../css/Sidebar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';


function sidebar() {
  const [username,setUsername] = useState('') 


  return (
    <div>
      <div className='sdbar_bg'></div>
      <div className='sdbar'>
        <div className='text_name'> Poomthai Promgote </div>
        <div className='acc_balance'> Account Balance</div>
        <div className='dollar_balance'>$100000</div>
       
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