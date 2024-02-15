import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Messages from './Messages';
import AccountList from './AccountList';

const ChatPage = ({ order_message = null }) => {
  const scroll = useRef();
  const userData = useSelector((state) => state.user);
  const [newChat, setNewChat] = useState(order_message);
  const [messageDetails, setMessageDetails] = useState(null);
  return (
    <div className="flex overflow-hidden h-full">
      {/* Chat sidebar */}
      <div className="flex flex-col w-1/4 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-2xl font-bold p-4 bg-indigo-700 text-white">Chat</h2>
        <AccountList new_chat={newChat} messageDetails={messageDetails} setMessageDetails={setMessageDetails} />
      </div>

      {/* Chat component */}
      <div className="flex-grow h-full">
        <div className="flex flex-col h-[92.5%]">
          {/* Chat header */}
          <div className="py-4 px-6 bg-indigo-700 text-white">
            <h2 className="text-2xl font-bold">
              {messageDetails ? `Messages for ${messageDetails.roomId}` : 'Select a recipient'}
            </h2>
          </div>
          {/* Chat messages */}
          <Messages
            messageDetails={messageDetails}
            userData={userData}
            scroll={scroll}
          />
          {/* Chat input */}

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
