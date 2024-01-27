import avatar from '../../images/avatar.jpg';
import { Avatar } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';


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
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </div>
    )
}

export default function Messages({ roomId, recipient, initialMessages, userData, scroll }) {
    const [messages, setMessages] = useState(initialMessages || []);
    const [intervalInitialized, setIntervalInitialized] = useState(false);
    const [id, setId] = useState(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchMessages = () => {
            if (sending) return;
            api
                .get(`/api/${roomId}/`)
                .then((response) => {
                    setMessages(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        if (!intervalInitialized && roomId) {
            fetchMessages();
            //sleep for 5 seconds
            let time = new Date().getTime();
            while (new Date().getTime() < time + 5000);

            let xid = setInterval(fetchMessages, 5000);
            setId(xid);
            setIntervalInitialized(true);
        }
        return () => {
            if (id) {
                clearInterval(id);
            }
        }
    }
        , [id, intervalInitialized, roomId]
    );

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
            recipient: roomId === "SUPPORT" ? "writerbeaz@gmail.com" : recipient.email,
        };
        setSending(true);
        api
            .post(`/api/${roomId}/send/`, message)
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



    return (
        <>
            <div className="flex-grow p-6 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            userData={userData}
                            scroll={scroll}
                        />

                    ))
                ) : (
                    <p className="p-4 text-gray-500">No messages found.</p>
                )}
            </div>

            <div className="py-4 px-6 bg-white absolute bottom-0 right-0 w-7/12">
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
            </div>
        </>
    );
}
