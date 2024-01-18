import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import api from '../../api/axiosConfig';
import avatar from '../../images/avatar.jpg';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const ChatPage = ({ order_message = null }) => {
  const [recipient, setRecipient] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const userData = useSelector((state) => state.user);
  const [new_chat, setNewChat] = useState(order_message);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [selected, setSelected] = useState("");

  const senderId = userData.user_id;

  useEffect(() => {
    if (messages.length > 0) {
      setFetchingMessages(false);
    }
    if (new_chat) {
      setRecipient(new_chat);
      setRoomId(new_chat.order_number);
      setMessages([]);
      return;
    }
    if (roomId) {
      //remove first character from order number
      const room = roomId.slice(1);
      // Fetch existing messages for the chat
      api
        .get(`/api/${room}/`)
        .then((response) => {
          setMessages(response.data);
          setFetchingMessages(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    if (!recipient) {
      toast.error('Please select a recipient to chat with.', { duration: 5000 });
      return;
    }

    const to_send_text = e.target.message.value;
    if (!to_send_text || to_send_text.length == 0) {
      toast.error('Please type a message.', { duration: 5000 });
      return;
    }

    const toDisplayMessage = {
      content: to_send_text,
      sender: userData.email,
      recipient: recipient.email,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [
      ...prevMessages, toDisplayMessage
    ]);

    e.target.message.value = '';

    const message = {
      content: to_send_text,
      sender: senderId,
      recipient: recipient.email,
    };

    api
      .post(`/api/${roomId.slice(1)}/send/`, message)
      .then((response) => {
        //const newMessage = response.data;
        //setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    /*
        if (socketRef.current) {
          socketRef.current.send(JSON.stringify(message));
        }
    */
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user data for the sidebar (you can replace this with your own implementation)
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Fetch user data
    if (new_chat) {
      setMessageList([new_chat]);
    }

    console.log("fetching message list");
    api
      .get('/api/accounts-list/')
      .then((response) => {
        if (new_chat) {
          setMessageList([...response.data, new_chat]);
          setNewChat(null);
        }
        else {
          setMessageList(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Chat sidebar */}
      <div className="flex flex-col bg-white w-1/4 border-r border-gray-200">
        <h2 className="text-2xl font-bold p-4 bg-indigo-700 text-white">Chat</h2>
        <ul className="flex-grow overflow-y-auto">
          {Array.isArray(messageList) && messageList.length > 0 ? (
            messageList.map((message) => (
              <li
                key={message.id}
                className={`flex items-center py-3 px-4 cursor-pointer` + (selected === message.order_number ? ' bg-blue-200' : '')}
                onClick={() => {
                  setSelected((prev) => message.order_number);
                  setRecipient((prev) => message);
                  setRoomId((prev) => message.order_number);
                  setMessages([]);
                  setFetchingMessages(true);
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
                  <h3 className="text-start ms-3 text-lg font-semibold">Order {message.order_number}</h3>
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
              {recipient ? `Messages for order ${roomId}` : 'Select a recipient'}
            </h2>
          </div>
          {/* Chat messages */}
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex ${message.sender === userData.email ? 'justify-end' : 'justify-start'
                    } mb-4`}
                >
                  <div
                    className={`${message.sender === userData.email
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
            ) : (<>
              {fetchingMessages ? (
                <Loader />
              ) : (
                <p className="p-4 text-gray-500">No messages found.</p>
              )}
            </>
            )}
          </div>
          {/* Chat input */}
          <div className="py-4 px-6 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(e);
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                //value={newMessage}
                //onChange={}
                name="message"
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
