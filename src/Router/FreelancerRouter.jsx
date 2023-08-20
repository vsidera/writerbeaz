import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FreelancerHome from '../Components/Freelancer/FreelancerHome'
import FreelancerRegister from '../Components/Freelancer/FreelancerRegister'

function FreelancerRouter() {
  return (
    <Routes>
        <Route path="/" element={<FreelancerHome />} />
        <Route path="/register" element={<FreelancerRegister />} />
    </Routes>
  )
}

export default FreelancerRouter