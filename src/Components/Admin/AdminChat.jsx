import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../Layout/AdminSidebar';
import AChat from '../AdminChat/AChat';

function AdminChatX() {

  return (
    <div className='h-screen'>
      <AdminSidebar />
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[94%]">
          <AChat />
        </div>
    </div>
  )
}

export default AdminChatX;
