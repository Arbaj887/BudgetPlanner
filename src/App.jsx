import { useState } from 'react'
import {Outlet} from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Userinfo from './components/Userinfo'

function App() {
  

  return (
    <>
       <div className= 'flex flex-col justify-center items-center h-screen md:h-fit bg-[#e0f2fe] pb-4 w-full'>
        <Navbar/>
        
        <Outlet/>
       </div>
    </>
  )
}

export default App
