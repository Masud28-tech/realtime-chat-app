const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socket = require('socket.io');
const userRoutes = require("./routes/userRoute");
const messagesRoutes = require("./routes/messagesRoute");

dotenv.config({path: './config.env'});
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/message', messagesRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected Successfully.")
}).catch((err) => {
    console.log(err.message);
});

let port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is started on Port ${process.env.PORT}`);
});

//  SOCKET.IO: work for establishing real-time chat rendering and sending/receiving
const io = socket(server, {
    cors: {
        origin: process.env.CLIENT_URI,
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});