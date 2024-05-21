import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chart from './Page/Chart'
import Trading from './Page/Trading'
import Setting from './Page/Setting'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Chart/>
  },
  {
    path: "Trading",
    element: <Trading/>
  },
  {
    path: "Setting",
    element: <Setting/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
