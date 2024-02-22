import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Log/Login/Login.jsx'
import Sign from './Log/Sign/Sign.jsx'

import Home from './pages/Home.tsx'
import './index.css'


const router = createBrowserRouter([
  {

    path: "/",
    element: <Login/>,
  },
  {
    path: "/sign",
    element: <Sign/>,
  }
  ,
  {

    path: "/home",
    element: <Home/>,
  }

]);
console.log("batman")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)