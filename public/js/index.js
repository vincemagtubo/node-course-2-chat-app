var socket_ = io();

//events
socket_.on('connect', function () {
    console.log('Connected to server. \n(public/index.html)');

    //client side script that connects to the server.
    // socket_.emit('createMessage', {
    //     from: 'Kanye',
    //     text: 'this is a sample text from Kanye West'
    // });
});

socket_.on('newMessage', function (newMssg) {
    console.log('New Message', newMssg);
});

socket_.on('disconnect', function () {
    console.log('Disconnected from server. \n(public/index.html)');
});

    