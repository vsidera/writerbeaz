import avatar from '../../images/support.jpg';
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function Message({ message, userData, scroll }) {
    return (
        <div
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
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </div>
    )
}

export default function Messages({ messageDetails, userData, scroll }) {
    const [messages, setMessages] = useState(null);
    const [id, setId] = useState(null);
    const [sending, setSending] = useState(false);
    const user = useSelector((state) => state.user);
    const isAdmin = user && user.user_type == "Admin";


    const roomId = messageDetails?.roomId;
    const recipient = roomId == "SUPPORT" ? "writerbeaz@gmail.com" : messageDetails?.recipient;

    useEffect(() => {
        const fetchMessages = async () => {
            if (sending) return;
            await api
                .get(`/api/${roomId}/`)
                .then((response) => {
                    setMessages(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        if (messages == null && roomId) {
            fetchMessages();
        }

        let isFetching = false;

        if (roomId) {
            let xid = setInterval(async () => {
                console.log("Checking " + isFetching)
                if (!isFetching) {
                    isFetching = true;
                    fetchMessages()
                        .then(() => {
                            isFetching = false;
                        })
                }

            }, 5000);
            setId(xid);
        }
    }
        , [roomId, messages, sending]
    );

    useEffect(() => {
        return () => {
            if (id) {
                clearInterval(id);
            }
        }
    }, [id]);


    //scroll to bottom
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, scroll]);



    const sendMessage = (e) => {
        if (!recipient) {
            toast.error('Please select a recipient to chat with.', { duration: 5000 });
            return;
        }

        const to_send_text = e.target.message.value;
        if (!to_send_text || to_send_text.length === 0) {
            toast.error('Please type a message.', { duration: 5000 });
            return;
        }

        e.target.message.value = '';

        const message = {
            content: to_send_text,
            sender: userData.user_id,
            recipient: roomId === "SUPPORT" ? "writerbeaz@gmail.com" : recipient,
        };
        setSending(true);
        api
            .post(`/api/${getSendId()}/send/`, message)
            .then((response) => {
                const newMessage = response.data;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setSending(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('An error occurred while sending your message.', { duration: 5000 });
            });
    };

    const getSendId = () => {
        if (isAdmin) {
            return "SUPPORT";
        }

        return roomId;
    }

    useEffect(() => {
        return () => {
            setMessages(null);
        }
    }, [roomId]);



    return (
        <>
            <div className="flex-grow p-6 overflow-y-auto">
                {!roomId && (
                    <div className="text-center">Select a recipient to start chatting.</div>
                )}

                {messages?.length > 0 ? (
                    messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            userData={userData}
                            scroll={scroll}
                        />

                    ))
                ) : (
                    <>
                        {messages == null && roomId ? (
                            <div className="text-center">Fetching messages...</div>
                        ) : (
                            <>
                                {roomId && <div className="text-center">No messages yet.</div>
                                }
                            </>
                        )}
                    </>
                )}
            </div>

            {roomId && <div className="py-4 px-6 bg-white absolute bottom-0 right-0 w-7/12">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(e);
                    }}
                    className="flex space-x-2"
                >
                    <input
                        type="text"
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
            </div>}
        </>
    );
}
