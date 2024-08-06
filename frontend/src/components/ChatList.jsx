import "../styles/ChatList.css"
import io from "socket.io-client"

const ChatList = () =>{
    const socket = io()

    const form = document.getElementById('form');
    let inputUser = document.getElementById('inputUsername');
    let inputMessage = document.getElementById('inputMessage');
    let errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!socket.username && inputUser.value) {
            socket.emit('set username', inputUser.value, function(success) {
                if (success) {
                    socket.username = inputUser.value;
                    inputUser.disabled = true;
                    inputMessage.disabled = false;
                    errorMessage.textContent = '';
                } else {
                    errorMessage.textContent = 'Username already taken. Please choose another one.';
                }
            });
        } else if (socket.username && inputMessage.value) {
            socket.emit('chat message', inputMessage.value);
            inputMessage.value = '';
        }
    });

    socket.on('chat message', function(msg) {
        let item = document.createElement('li');
        item.textContent = msg;
        document.getElementById('messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('user connected', function(user) {
        let item = document.createElement('li');
        item.textContent = user + ' has joined the chat.';
        document.getElementById('messages').appendChild(item);
    });

    socket.on('user disconnected', function(user) {
        let item = document.createElement('li');
        item.textContent = user + ' has left the chat.';
        document.getElementById('messages').appendChild(item);
    });

// Écouter l'événement 'chat history' pour récupérer l'historique des messages
    socket.on('chat history', function(history) {
        history.forEach(function (msg) {
            let item = document.createElement('li');
            item.textContent = msg;
            document.getElementById('messages').appendChild(item);
        });
        window.scrollTo(0, document.body.scrollHeight);
    })
    return(
        <>
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="inputUsername" autoComplete="off" placeholder="Enter your username"/>
                <input id="inputMessage" autoComplete="off" placeholder="Enter your message" disabled/>
                <button>Send</button>
            </form>
            <p className="errorMessage"></p>
        </>
    )
}

export default ChatList;