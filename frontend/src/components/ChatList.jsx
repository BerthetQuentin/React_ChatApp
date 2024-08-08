import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UsernameInput from './UsernameInput';
import '../styles/ChatList.css';

const ChatList = () => {
    const [socket] = useState(() => io('http://localhost:3001'));
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connecté au serveur Socket.io');
        });

        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            window.scrollTo(0, document.body.scrollHeight);
        });

        socket.on('user connected', (user) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                `${user} has joined the chat.`,
            ]);
        });

        socket.on('user disconnected', (user) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                `${user} has left the chat.`,
            ]);
        });

        socket.on('chat history', (history) => {
            setMessages(history);
            window.scrollTo(0, document.body.scrollHeight);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleSetUsername = (usernameValue) => {
        socket.emit('set username', usernameValue, (success) => {
            if (success) {
                setUsername(usernameValue);
                setError('');
            } else {
                setError('Username already taken. Please choose another one.');
            }
        });
    };

    const handleSendMessage = (messageValue) => {
        if (messageValue) {
            socket.emit('chat message', messageValue);
        } else {
            setError('Please enter a message.');
        }
    };

    return (
        <div className="chat-container">
            <MessageList messages={messages} />
            {!username ? (
                <UsernameInput onSetUsername={handleSetUsername} error={error} />
            ) : (
                <MessageInput onSendMessage={handleSendMessage} />
            )}
        </div>
    );
};

export default ChatList;
