import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../Components/Auth/Signup';
import OtpVerification from '../Components/Auth/OtpVerification';
import Login from '../Components/Auth/Login';
import Logout from '../Components/Auth/Logout';
import Home from '../Components/User/Home';

function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

export default UserRouter