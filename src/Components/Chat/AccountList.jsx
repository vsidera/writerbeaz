import avatar from '../../images/avatar.jpg';
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';

export default function AccountList({ new_chat, setShowChat, messageDetails, setMessageDetails, display}) {
    const [messageList, setMessageList] = useState([]);
    const [newChat, setNewChat] = useState(new_chat);
    const [intervalInitialized, setIntervalInitialized] = useState(false);
    const [id, setId] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const user = useSelector((state) => state.user);
    const isAdmin = user && user.user_type == "Admin";
    console.log(display);


    useEffect(() => {
        if (newChat) {
            setMessageDetails({
                roomId: isAdmin ? newChat.username : newChat.order_number,
                recipient: newChat.email,
            });
            return;
        }
    }, []);

    useEffect(() => {
        if (newChat) {
            setMessageList([newChat]);
        }

        const fetchAccounts = async () => {
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

        let isFetching = false;

        if (!intervalInitialized) {
            fetchAccounts();
            if (!isAdmin) {
                let xid = setInterval(async () => {
                    if (!isFetching) {
                        isFetching = true;
                        fetchAccounts()
                            .then(() => {
                                isFetching = false;
                            })
                    }
                }, 5000);
                setId(xid);

            }
            setIntervalInitialized(true);
        }

        return () => {
            if (id) {
                clearInterval(id);
            }
        }
    }, []);


    const isSelected = (message) => {
        if (!messageDetails) {
            return false;
        }
        if (isAdmin && message.username == messageDetails.roomId) {
            return true;
        }
        else if (!isAdmin && message.order_number == messageDetails.roomId) {
            return true;
        }
        return false;
    }



    return (
        <ul className="h-full overflow-y-auto">
            {Array.isArray(messageList) && messageList.length > 0 ? (
                messageList.map((message, ind) => (
                    <li
                        key={ind}
                        className={`flex items-center py-3 px-4 cursor-pointer` + (isSelected(message) ? " bg-gray-200" : "")}
                        onClick={() => {
                            setMessageDetails({
                                roomId: isAdmin ? message.username : message.order_number,
                                recipient: message.email,
                            });
                            setShowChat(true);
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
                            <h3 className="text-start ms-3 text-lg font-semibold">
                                {isAdmin && message.username}
                                {!isAdmin && (message.order_number == "SUPPORT" ? "SUPPORT" : "Order " + message.order_number)}
                            </h3>
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
