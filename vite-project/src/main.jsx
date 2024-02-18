import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Log/Login/Login.jsx'
import Sign from './Log/SIgn/Sign.jsx'
import './index.css'

console.log("batman")
const router = createBrowserRouter([
  {

    path: "/",
    element: <Login/>,
  },
  {
    path: "/sign",
    element: <Sign/>,
  }

]);
console.log("batman")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)