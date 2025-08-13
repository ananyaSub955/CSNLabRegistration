import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const AdminLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>

  )
}

export default AdminLayout