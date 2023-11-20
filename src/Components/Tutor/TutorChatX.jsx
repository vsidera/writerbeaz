import React from 'react'
import TutorSidebar from '../Layout/TutorSidebar'
import ChatPage from '../Chat/ChatPage'

function TutorChatX() {
  return (
    <div>
        <TutorSidebar />
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <ChatPage />
        </div>
    </div>
  )
}

export default TutorChatX