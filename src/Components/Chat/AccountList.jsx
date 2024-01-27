import avatar from '../../images/avatar.jpg';
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

export default function AccountList({ new_chat, setRecipient, setRoomId, setMessages, setFetchingMessages, setSelected, selected }) {
    const [messageList, setMessageList] = useState([]);
    const [newChat, setNewChat] = useState(new_chat);
    const [intervalInitialized, setIntervalInitialized] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (newChat) {
            setRecipient(newChat);
            setRoomId(newChat.order_number);
            return;
        }
    }, []);

    useEffect(() => {
        if (newChat) {
            setMessageList([newChat]);
        }

        const fetchAccounts = () => {
            api
                .get('/api/accounts-list/')
                .then((response) => {
                    if (newChat) {
                        //if response.data contains newChat, then don't add it
                        //else add it
                        var found = false;
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].order_number == newChat.order_number) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            setMessageList([...response.data, newChat]);
                            setNewChat(null);
                        }
                        else {
                            setMessageList(response.data);
                            setNewChat(null);
                        }
                    }
                    else {
                        setMessageList(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
        if (!intervalInitialized) {
            fetchAccounts();
            let xid = setInterval(fetchAccounts, 10000);
            console.log("setting interval id: " + xid);
            setId(xid);
            setIntervalInitialized(true);
        }

        return () => {
            if (id) {
                clearInterval(id);
            }
        }
    }, []);


    return (
        <ul className="flex-grow overflow-y-auto">
            {Array.isArray(messageList) && messageList.length > 0 ? (
                messageList.map((message, ind) => (
                    <li
                        key={ind}
                        className={`flex items-center py-3 px-4 cursor-pointer` + (selected === message.order_number ? ' bg-blue-200' : '')}
                        onClick={() => {
                            setSelected((prev) => message.order_number);
                            setRecipient((prev) => message);
                            setRoomId((prev) => message.order_number);
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
                            <h3 className="text-start ms-3 text-lg font-semibold">{message.order_number == "SUPPORT" ? "SUPPORT" : "Order " + message.order_number}</h3>
                        </div>
                        {/* You can add online/offline status indicators here */}
                    </li>
                ))
            ) : (
                <p className="p-4 text-gray-500">No recipients found.</p>
            )}
        </ul>
    );
}
