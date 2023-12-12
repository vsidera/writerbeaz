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
import UserHome from '../Components/User/UserBoard/UserHome';
import PostJobPage from '../Components/User/UserBoard/PostJobPage';
import Orders from '../Components/User/UserBoard/Orders';


function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/post-job" element={<PostJobPage />} />
        <Route path="/user/find-tutor" element={<FindTutor />} />
        <Route path="/user/about" element={<About />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/single-view/:id" element={<SingleView />} />
        <Route path="/user/tutor-view/:id" element={<TutorView />} />
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/user/orderconfirmation/:id" element={<OrderConfirmation />} />
        <Route path="/user/orderstatus/:id" element={<OrderStatus />} />
        <Route path="/user/chat" element={<ChatPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default UserRouter