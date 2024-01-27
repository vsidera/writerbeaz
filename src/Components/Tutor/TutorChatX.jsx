import React from 'react'
import TutorSidebar from '../Layout/TutorSidebar'
import ChatPage from '../Chat/ChatPage'

function TutorChatX() {
  return (
    <div className='h-screen'>
        <TutorSidebar />
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[94%]">
          <ChatPage />
        </div>
    </div>
  )
}

export default TutorChatX
