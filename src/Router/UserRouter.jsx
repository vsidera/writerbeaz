import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../Components/Auth/Signup';
import OtpVerification from '../Components/Auth/OtpVerification';
import Login from '../Components/Auth/Login';
import Logout from '../Components/Auth/Logout';
import Home from '../Components/User/Home';
import FindTutor from '../Components/User/FindTutor';
import About from '../Components/User/About';
import UserProfile from '../Components/User/UserProfile';
import SingleView from '../Components/User/SingleView';
import TutorView from '../Components/User/TutorView';
import OrderConfirmation from '../Components/User/OrderConfirmation';
import OrderStatus from '../Components/User/OrderStatus';
import NotFound404 from '../Components/Layout/NotFound404';
import ChatPage from '../Components/Chat/ChatPage';


function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-tutor" element={<FindTutor />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/single-view/:id" element={<SingleView />} />
        <Route path="/tutor-view/:id" element={<TutorView />} />
        <Route path="/orderconfirmation/:id" element={<OrderConfirmation />} />
        <Route path="/orderstatus/:id" element={<OrderStatus />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default UserRouter