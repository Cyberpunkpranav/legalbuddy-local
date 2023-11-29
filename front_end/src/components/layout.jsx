import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'
const Navbar = lazy(()=>import('./navbar'))

const Layout = () => {
  return (
    <main className='App bg-transparent'>
      <div className="">
      <Navbar/>
      </div>
        <Outlet/>
    </main>
  )
}

export default Layout