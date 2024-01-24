import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../Layout/AdminSidebar';
import AChat from '../Chat/AChat';

function AdminChatX() {

  return (
    <div>
      <AdminSidebar />
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <AChat />
        </div>
    </div>
  )
}

export default AdminChatX;