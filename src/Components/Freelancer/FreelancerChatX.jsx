import React from 'react'
import FreelancerSidebar from '../Layout/FreelancerSidebar'
import ChatPage from '../Chat/ChatPage'

function FreelancerChatX() {
  return (
    <div>
        <FreelancerSidebar />
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <ChatPage />
        </div>
    </div>
  )
}

export default FreelancerChatX