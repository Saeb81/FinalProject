import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Log/Login/Login.jsx'
import Sign from './Log/Sign/Sign.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Home from './pages/Home.tsx'
import Library from './pages/Library/Library.jsx'
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
  ,
  {

    path: "/profile",
    element: <Profile/>,
  }

  ,
  {
    path: "/library",
    element: <Library/>,
  }

]);
console.log("batman")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)