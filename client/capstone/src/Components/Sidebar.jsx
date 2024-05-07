import React from 'react'
import "../css/Sidebar.css"
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
        <Link to ="/"><div className='chart'> Chart</div></Link>
        <Link to ="/Trading"><div className='trade'> Trading </div></Link>
        <Link to ="/Setting"><div className='setting'> Setting </div></Link>
      </div>
      <div></div>
    </div>
  )
}

export default sidebar