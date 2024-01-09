import React from 'react'
import UserSidebar from './UserBoard/UserSidebar';
import ChatPage from '../Chat/ChatPage'

function UserChatX() {
  return (
    <div>
        <UserSidebar />
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <ChatPage />
        </div>
    </div>
  )
}

export default UserChatX;
