const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes  = require("./routes/userRoute");
const messagesRoutes = require("./routes/messagesRoute");

const app = express();
require('dotenv').config();

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

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started on Port ${process.env.PORT}`);
});