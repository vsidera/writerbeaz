import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import TutorHome from '../Components/Tutor/TutorHome'
import TutorRegister from '../Components/Tutor/TutorRegister'
import TutorProfile from '../Components/Tutor/TutorProfile'
import TutorInbox from '../Components/Tutor/TutorInbox'
import TutorWorks from '../Components/Tutor/TutorWorks'
import TutorChatX from '../Components/Tutor/TutorChatX'
import TutorEditProfileModal from '../Components/Tutor/TutorEditProfileModal'
import NotFound404 from '../Components/Layout/NotFound404'

function TutorRouter() {
  return (
    <Routes>
        <Route path="/" element={<TutorHome />} />
        <Route path="/register" element={<TutorRegister />} />
        <Route path="/profile" element={<TutorProfile />} />
        <Route path="/inbox" element={<TutorInbox />} />
        <Route path="/works" element={<TutorWorks />} />
        <Route path="/chatx" element={<TutorChatX />} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default TutorRouter