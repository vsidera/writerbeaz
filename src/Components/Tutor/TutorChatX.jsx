import React from 'react'
import TutorSidebar from '../Layout/TutorSidebar'
import ChatPage from '../Chat/ChatPage'
import { useLocation } from 'react-router-dom';

function TutorChatX() {
  const { state } = useLocation();
  const order_message = state?.order_message == undefined ? null : state?.order_message;
  return (
    <div className='h-screen'>
      <TutorSidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[94%]">
        <ChatPage order_message={order_message}/>
      </div>
    </div>
  )
}

export default TutorChatX
