import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Messages from './Messages';
import AccountList from './AccountList';
import { setDisplayChat, setNewOrderMessage } from '../../Redux/store';

const ChatPage = ({ }) => {
  const scroll = useRef();
  const userData = useSelector((state) => state.user);
  const [display, setDisplay] = useState('none');

  const dispatch = useDispatch();
  const newOrderMessage = useSelector((state) => state.newOrderMessage);
  const displayChat = useSelector((state) => state.displayChat);
  const [acId, setAcId] = useState(null);
  const [mgId, setMgId] = useState(null);
  const [added, setAdded] = useState(false);

  const [messageDetails, setMessageDetails] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [newChat, setNewChat] = useState(null);


  useEffect(() => {
    console.log("Changed!")
    setNewChat(newOrderMessage);
    if(display == 'none'){
      setDisplay(displayChat);
    }
  }, [newOrderMessage]);

  const cleanUp = () => {
    clearInterval(acId);
    clearInterval(mgId);
  }

  if(display === 'none'){
    cleanUp();
    return <></>
  }



  const ChatHeading = () => {
    return (
      <div className='flex justify-between items-center border-b-2 py-4 px-2 border-gray-300'>
        < button
          onClick={() => {
            setShowChat(false);
            setMessageDetails(null);
          }}
          className={"text-gray-600" + (showChat ? ' ' : ' hidden')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button >

        {showChat ? (
          <h2 className="text-xl font-bold">
            {messageDetails ? `Messages for ${messageDetails.roomId}` : 'Select a recipient'}
          </h2>

        ) : (
          <h2 className="text-xl font-bold">Chat</h2>
        )}
        < div
          className='flex justify-center items-center w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer'
          onClick={() => {
            cleanUp();
            setDisplay('none');
            dispatch(setDisplayChat('none'));
          }}>
          x
        </div>

      </div>
    )
  }


  return (
    <div className={"overflow-hidden h-full w-full lg:w-1/5 fixed bg-white top-0 lg:top-16 lg:right-4 border-2 border-gray-300 z-40" + (display === 'none' ? '' : '')}>
      <div className="flex flex-col w-full h-full border-r border-gray-200">
        <div>
          <ChatHeading />
        </div>
        {showChat === true ? (
          <Messages
            messageDetails={messageDetails}
            userData={userData}
            scroll={scroll}
            display={display}
            setShowChat={setShowChat}
            setMgId={setMgId}
          />
        ) : (
          <AccountList
            setShowChat={setShowChat}
            messageDetails={messageDetails}
            setMessageDetails={setMessageDetails}
            display={display}
            setAcId={setAcId}
            added={added}
            setAdded={setAdded}
            dispatch={dispatch}
            setNewOrderMessage={setNewOrderMessage}
            newChat={newChat}
            setNewChat={setNewChat}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
