import React from 'react'
import StudentHistory from '../Student/StudentHistory'
import { Outlet } from 'react-router-dom'

const StudentHistoryLayout = () => {
    return (
        <div>
            <StudentHistory />
            <Outlet />
        </div>
    )
}

export default StudentHistoryLayout