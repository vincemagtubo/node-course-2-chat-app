//start program

const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const pathPublic = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pathPublic));

io.on('connection', (socket_) => {
    console.log('New user added. (server/server.js)');

    //to the chat app.
    socket_.emit('newMessage', generateMessage('Administrator', 'Welcome to Chat app nigger.'));

    socket_.broadcast.emit('newMessage', generateMessage('Administrator', 'New user has joined.'));
        
    socket_.on('createMessage', (createMssg, callbackIt) => {
        console.log('Create Message', createMssg);

        //server side script that connects to the client
        io.emit('newMessage', generateMessage(createMssg.from, createMssg.text));
        callbackIt('from server/server.js');
    });

    socket_.on('createLocationMssg', (succPosition) => {
        io.emit('newLocationMssg', generateLocationMessage('Administrator', succPosition.latitude, succPosition.longtitude));
    });

    socket_.on('disconnect', () => {
        console.log('User has disconnected. (server/server.js)');
    });
});

server.listen(port, () => {
    console.log(`Started at ${port}`);
})
