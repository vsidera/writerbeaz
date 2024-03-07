import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../Components/Admin/AdminDashboard'
import AdminCategory from '../Components/Admin/AdminCategory'
import AdminUserManagement from '../Components/Admin/AdminUserManagement'
import AdminTransactions from '../Components/Admin/AdminTransactions'
import NotFound404 from '../Components/Layout/NotFound404'
import AdminChatX from '../Components/Admin/AdminChat'
import AdminCoupons from '../Components/Admin/AdminCoupons'

function AdminRouter() {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/category" element={<AdminCategory />} />
        <Route path="/management" element={<AdminUserManagement />} />
        <Route path="/transactions" element={<AdminTransactions />} />
        <Route path="/chatx" element={<AdminChatX />} />
        <Route path='/coupons' element={<AdminCoupons />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default AdminRouter
