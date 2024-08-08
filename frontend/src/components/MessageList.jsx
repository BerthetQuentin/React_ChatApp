import React from 'react';
import '../styles/MessageList.css';

const MessageList = ({ messages }) => {
    return (
        <ul className="message-list">
            {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    );
};

export default MessageList;
