import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import AdminCategory from '../Components/Admin/AdminCategory'
import AdminUserManagement from '../Components/Admin/AdminUserManagement'
import AdminTransactions from '../Components/Admin/AdminTransactions'
import AdminWallet from '../Components/Admin/AdminWallet'

function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/category" element={<AdminCategory />} />
        <Route path="/user-management" element={<AdminUserManagement />} />
        <Route path="/transactions" element={<AdminTransactions />} />
        <Route path="/wallet" element={<AdminWallet />} />
    </Routes>
  )
}

export default AdminRouter