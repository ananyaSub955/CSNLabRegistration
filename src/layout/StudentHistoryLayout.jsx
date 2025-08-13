import React from 'react'
import StudentHistory from '../Student/StudentHistory'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const StudentHistoryLayout = () => {
    return (
        <div>
            <StudentHistory />
            <Outlet />
            <Footer />
        </div>
    )
}

export default StudentHistoryLayout