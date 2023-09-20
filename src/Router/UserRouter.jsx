import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../Components/Auth/Signup';
import OtpVerification from '../Components/Auth/OtpVerification';
import Login from '../Components/Auth/Login';
import Logout from '../Components/Auth/Logout';
import Home from '../Components/User/Home';
import FindFreelancer from '../Components/User/FindFreelancer';
import About from '../Components/User/About';
import UserProfile from '../Components/User/UserProfile';
import SingleView from '../Components/User/SingleView';
import FreelancerView from '../Components/User/FreelancerView';
import OrderConfirmation from '../Components/User/OrderConfirmation';
import OrderStatus from '../Components/User/OrderStatus';
import NotFound404 from '../Components/Layout/NotFound404';
import ChatComponent from '../Components/Chat/ChatComponent';


function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-freelancer" element={<FindFreelancer />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/single-view/:id" element={<SingleView />} />
        <Route path="/freelancer-view/:id" element={<FreelancerView />} />
        <Route path="/orderconfirmation/:id" element={<OrderConfirmation />} />
        <Route path="/orderstatus/:id" element={<OrderStatus />} />

        <Route path="/chat" element={<ChatComponent />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default UserRouter