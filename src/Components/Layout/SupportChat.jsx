import React from 'react'
import ChatPage from '../Chat/ChatPage'
import TutorSidebar from './TutorSidebar';

function SupportChat() {
  const order_message = {
    order_number: "SUPPORT"
  }

  return (
    <div className='h-screen'>
      <TutorSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[94%]">
        <ChatPage order_message={order_message} />
      </div>
    </div>
  )
}

export default SupportChat;
