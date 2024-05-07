import React from 'react'
import "./Sidebar.css"
import { useState, useEffect } from "react";

function sidebar() {
  const [username,setUsername] = useState('') // รับค่า Username จาก back

  return (
    <div>
      <div className='sdbar_bg'></div>
      <div className='sdbar'>
        <div className='text_name'> Poomthai Promgote 
          <div className='acc_balance'> Account Balance</div>
          <div className='dollar_balance'>$100000</div>
        </div>
      </div>
    </div>
  )
}

export default sidebar