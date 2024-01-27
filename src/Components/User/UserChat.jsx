import React from 'react'
import UserSidebar from './UserBoard/UserSidebar';
import ChatPage from '../Chat/ChatPage'
import { useLocation } from 'react-router-dom';

function UserChatX() {
    //load order_message {} from state
    const {state} = useLocation();
    const order_message = state?.order_message == undefined ? null : state?.order_message;

  return (
    <div className='h-screen'>
        <UserSidebar />
        <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[94%]">
          <ChatPage order_message={order_message}/>
        </div>
    </div>
  )
}

export default UserChatX;
