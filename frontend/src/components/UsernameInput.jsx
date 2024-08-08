import React, { useRef } from 'react';
import '../styles/UsernameInput.css';

const UsernameInput = ({ onSetUsername, error }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const usernameValue = inputRef.current.value;
        onSetUsername(usernameValue);
    };

    return (
        <form className="username-input" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                autoComplete="off"
                placeholder="Enter your username"
            />
            <button type="submit">Set Username</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default UsernameInput;
