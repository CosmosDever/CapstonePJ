import React from 'react'
import "./Sidebar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function sidebar() {
  const [username,setUsername] = useState('') // รับค่า Username จาก back

  return (
    <div>
      <div className='sdbar_bg'></div>
      <div className='sdbar'>
        <div className='text_name'> Poomthai Promgote </div>
        <div className='acc_balance'> Account Balance</div>
        <div className='dollar_balance'>$100000</div>
        <div className='chart'>Chart</div>
        <div className='trade'> Trading </div>
        <div className='setting'> Setting </div>
      </div>
      <div></div>
    </div>
  )
}

export default sidebar