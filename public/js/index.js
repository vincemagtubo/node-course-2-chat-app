var socket_ = io();

//events
socket_.on('connect', function () {
    console.log('Connected to server. \n(public/index.html)');
});

socket_.on('disconnect', function () {
    console.log('Disconnected from server. \n(public/index.html)');
});



socket_.on('newMessage', function (newMssg) {
    console.log('New Message', newMssg);

    var li = jQuery('<li></li>');
    li.text(`${newMssg.from}: ${newMssg.text}`);

    jQuery('#messagesAll').append(li);
});


jQuery('#message-form').on('submit', function (prevent) {
    prevent.preventDefault();
    socket_.emit('createMessage', {
        from: 'Nigger',
        text: jQuery('[name=messageOne]').val()
    }, function () {
        
    });
});