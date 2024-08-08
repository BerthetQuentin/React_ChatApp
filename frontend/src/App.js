import React from "react";
import "./styles/App.css";

// Import components
import Header from "./components/Header.jsx";
import ChatList from "./components/ChatList.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <ChatList />
        </div>
    );
}

export default App;
