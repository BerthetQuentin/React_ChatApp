import React, { useRef } from 'react';
import '../styles/MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const messageValue = inputRef.current.value;
        onSendMessage(messageValue);
        inputRef.current.value = '';
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                autoComplete="off"
                placeholder="Enter your message"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
