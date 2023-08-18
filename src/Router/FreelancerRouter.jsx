import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FreelancerHome from '../Components/Freelancer/FreelancerHome'

function FreelancerRouter() {
  return (
    <Routes>
        <Route path="/" element={<FreelancerHome />} />
    </Routes>
  )
}

export default FreelancerRouter