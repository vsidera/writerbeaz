import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import FreelancerHome from '../Components/Freelancer/FreelancerHome'
import FreelancerRegister from '../Components/Freelancer/FreelancerRegister'
import FreelancerProfile from '../Components/Freelancer/FreelancerProfile'
import FreelancerInbox from '../Components/Freelancer/FreelancerInbox'
import FreelancerWorks from '../Components/Freelancer/FreelancerWorks'
import FreelancerChatX from '../Components/Freelancer/FreelancerChatX'
import FreelancerEditProfileModal from '../Components/Freelancer/FreelancerEditProfileModal'
import NotFound404 from '../Components/Layout/NotFound404'

function FreelancerRouter() {
  return (
    <Routes>
        <Route path="/" element={<FreelancerHome />} />
        <Route path="/register" element={<FreelancerRegister />} />
        <Route path="/profile" element={<FreelancerProfile />} />
        <Route path="/inbox" element={<FreelancerInbox />} />
        <Route path="/works" element={<FreelancerWorks />} />
        <Route path="/chatx" element={<FreelancerChatX />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default FreelancerRouter