const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = createServer(app);

// Configuration CORS
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Configuration de Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Assurez-vous que cela correspond à l'URL de votre frontend
        methods: ["GET", "POST"]
    },
    pingInterval: 25000,
    pingTimeout: 20000,
    maxHttpBufferSize: 1e6 // 1 MB
});

let users = [];
let messageHistory = []; // Tableau pour stocker l'historique des messages

io.on("connection", (socket) => {
    let time = new Date();
    let formattedDate = time.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });

    console.log(`${formattedDate} : a user connected`);

    // Envoyer l'historique des messages au nouveau client
    socket.emit("chat history", messageHistory);

    socket.on("set username", (user, callback) => {
        console.log("Received set username:", user); // Log du nom d'utilisateur
        if (users.includes(user)) {
            callback(false); // Nom d'utilisateur déjà pris
        } else {
            users.push(user);
            socket.username = user;
            callback(true); // Nom d'utilisateur accepté
            let formattedDate = new Date().toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            });
            console.log(`${formattedDate} : Username set to : ${user}`);

            io.emit("user connected", user);

            // Ajouter le message à l'historique
            messageHistory.push(`${user} has joined the chat`);

            // Limiter l'historique aux 100 derniers messages
            if (messageHistory.length > 100) {
                messageHistory.shift();
            }
        }
    });

    socket.on("chat message", (msg) => {
        console.log("Received chat message:", msg); // Log du message
        if (socket.username) {
            let fullMessage = `${socket.username}: ${msg}`;
            console.log(`message: ${fullMessage}`);

            // Ajouter le message à l'historique
            messageHistory.push(fullMessage);

            // Limiter l'historique aux 100 derniers messages
            if (messageHistory.length > 100) {
                messageHistory.shift();
            }

            io.emit("chat message", fullMessage);
        }
    });

    socket.on("disconnect", () => {
        if (socket.username) {
            users = users.filter(user => user !== socket.username);
            console.log(`user disconnected: ${socket.username}`);

            // Ajouter le message à l'historique
            messageHistory.push(`${socket.username} has left the chat`);

            // Limiter l'historique aux 100 derniers messages
            if (messageHistory.length > 100) {
                messageHistory.shift();
            }

            io.emit("user disconnected", socket.username);
        }
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
