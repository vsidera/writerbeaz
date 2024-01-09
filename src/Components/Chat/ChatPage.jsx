import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import api from '../../api/axiosConfig';
import avatar from '../../images/avatar.jpg';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [recipient, setRecipient] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();
  const userData = useSelector((state) => state.user);

  const socketRef = useRef(null);

  const senderId = userData.user_id;
  const recipientId = recipient ? recipient.id : '';

  useEffect(() => {
    if (roomId) {
      // Fetch existing messages for the chat
      api
        .get(`/api/rooms/${senderId}/${recipientId}/messages/list/`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [roomId, senderId, recipientId]);

  const sendMessage = () => {
    if (!recipient) {
      toast.error('Please select a recipient to chat with.', { duration: 5000 });
      return;
    }

    const message = {
      content: newMessage,
      sender: senderId,
      recipient: recipientId,
    };

    api
      .post(`/api/rooms/${senderId}/${recipientId}/messages/send/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }

    setNewMessage('');
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user data for the sidebar (you can replace this with your own implementation)
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // Fetch user data
    api
      .get('/api/accounts-list/')
      .then((response) => {
        setRecipients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  console.log(userData)


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Chat sidebar */}
      <div className="flex flex-col bg-white w-1/4 border-r border-gray-200">
        <h2 className="text-2xl font-bold p-4 bg-indigo-700 text-white">Chat</h2>
        <ul className="flex-grow overflow-y-auto">
          {Array.isArray(recipients) && recipients.length > 0 ? (
            recipients.map((user) => (
              <li
                key={user.id}
                className={`flex items-center py-3 px-4 cursor-pointer ${
                  recipient && recipient.id === user.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setRecipient(user);
                  const roomId = `${senderId}${user.id}`;
                  setRoomId(roomId);
                }}
              >
                <div className="flex-shrink-0 mr-3 mt-1">
                  <Avatar
                    src={avatar}
                    alt="User Avatar"
                    size="md"
                    className="rounded-full w-12 h-12 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-start ms-3 text-lg font-semibold">{user.first_name}</h3>
                </div>
                {/* You can add online/offline status indicators here */}
              </li>
            ))
          ) : (
            <p className="p-4 text-gray-500">No recipients found.</p>
          )}
        </ul>
      </div>

      {/* Chat component */}
      <div className="flex-grow bg-gray-200">
        <div className="flex flex-col h-screen">
          {/* Chat header */}
          <div className="py-4 px-6 bg-indigo-700 text-white">
            <h2 className="text-2xl font-bold">
              {recipient ? `Chat with ${recipient.first_name}` : 'Select a recipient'}
            </h2>
          </div>
          {/* Chat messages */}
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex ${
                    message.sender === userData.email ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`${
                      message.sender === userData.email
                        ? 'bg-blue-500 text-white self-end'
                        : 'bg-gray-300 text-gray-800 self-start'
                    } py-2 px-4 rounded-lg max-w-md`}
                  >
                    <div className="flex items-center">
                      {message.sender === userData.email ? (
                        <>
                          {message.content && (
                            <div className="mr-3">{message.content}</div>
                          )}
                          <Avatar
                            src={avatar}
                            alt="avatar"
                            size="xs"
                            className='rounded-full h-6 w-6'
                          />
                        </>
                      ) : (
                        <>
                          <Avatar
                            src={avatar}
                            alt="avatar"
                            size="xs"
                            className="mr-3 rounded-full h-6 w-6"
                          />
                          {message.content && (
                            <div>{message.content}</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
          </div>
          {/* Chat input */}
          <div className="py-4 px-6 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
