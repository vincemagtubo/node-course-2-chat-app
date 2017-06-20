//start program

const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const pathPublic = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pathPublic));

io.on('connection', (socket_) => {
    console.log('New user added. (server/server.js)');

    //server side script that connects to the client
    socket_.emit('newMessage', {
        from: 'JAY-Z',
        test: 'this is a sample text from JAY-Z',
        createdAt: 2323
    });

    socket_.on('createMessage', (createMssg) => {
        console.log('Create Message', createMssg);
    });

    socket_.on('disconnect', () => {
        console.log('User has disconnected. (server/server.js)');
    });
});

server.listen(port, () => {
    console.log(`Started at ${port}`);
})
