import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../components/StudentNavbar'
// import Footer from '../../components/Footer'

const UserLayout = () => {

  return (
    <div className="h-screen flex flex-col">
      <StudentNavbar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>

  )
}

export default UserLayout