import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <br />
    <Outlet/>
    
      
    </>
  )
}

export default Dashboard
