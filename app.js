const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3007;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval1;
let interval2;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval1) {
        clearInterval(interval1);
    }
    if (interval2) {
        clearInterval(interval1);
    }
    interval = setInterval(() => getApiAndEmit1(socket), 1000);
    interval2 = setInterval(() => getApiAndEmit2(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval1);
        clearInterval(interval2);
    });
});

const getApiAndEmit1 = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI1", response);
};

const getApiAndEmit2 = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI2", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
