import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import AdminCategory from '../Components/Admin/AdminCategory'
import AdminUserManagement from '../Components/Admin/AdminUserManagement'
import AdminTransactions from '../Components/Admin/AdminTransactions'

function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/category" element={<AdminCategory />} />
        <Route path="/management" element={<AdminUserManagement />} />
        <Route path="/transactions" element={<AdminTransactions />} />
    </Routes>
  )
}

export default AdminRouter