import avatar from '../../images/avatar.jpg';
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosConfig';

export default function AccountList({ setShowChat, messageDetails, setMessageDetails, setAcId, added, setAdded, dispatch, setNewOrderMessage, newChat, setNewChat}) {
    const [messageList, setMessageList] = useState([]);
    const [intervalInitialized, setIntervalInitialized] = useState(false);
    const [id, setId] = useState(null);
    const user = useSelector((state) => state.user);
    const isAdmin = user && user.user_type == "Admin";

    useEffect(() => {
        if (newChat) {
            setMessageDetails({
                roomId: isAdmin ? newChat.username : newChat.order_number,
                recipient: newChat.email,
            });
            setShowChat(true);
            dispatch(setNewOrderMessage(null));
        }

        const fetchAccounts = async (messages) => {
            console.log("Message list:", messages)

            api
                .get('/api/accounts-list/')
                .then((response) => {
                    console.log("Response: ", response.data)
                    setMessageList(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }

        let isFetching = false;

        console.log("Interval initialized: ", intervalInitialized)

        if (!intervalInitialized) {
            fetchAccounts(messageList);
            if (!isAdmin) {
                let xid = setInterval(async () => {
                    if (!isFetching) {
                        isFetching = true;
                        fetchAccounts(messageList)
                            .then(() => {
                                isFetching = false;
                            })
                    }
                }, 5000);
                setId(xid);
                setAcId(xid);

            }
            setIntervalInitialized(true);
        }

        return () => {
            if (id) {
                clearInterval(id);
            }
        }
    }, [newChat]);


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
