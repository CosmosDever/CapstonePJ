import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chart from './Page/Chart'
import './index.css'
import Sidebar from "./Components/Sidebar";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <Chart/>

    </>
  )
}

export default App
