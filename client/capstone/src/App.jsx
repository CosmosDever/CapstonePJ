import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chart from './Page/Chart'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chart/>
    </>
  )
}

export default App
