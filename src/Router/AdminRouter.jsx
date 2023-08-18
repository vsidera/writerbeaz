import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'

function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
    </Routes>
  )
}

export default AdminRouter