var socket_ = io();

//events
socket_.on('connect', function () {
    console.log('Connected to server. \n(public/index.html)');
});

socket_.on('disconnect', function () {
    console.log('Disconnected from server. \n(public/index.html)');
});



socket_.on('newMessage', function (newMssg) {
    var formattedTimeNewMssg = moment(newMssg.createdAtMssg).format('h:mm a');

    var tempMssg = jQuery('#scrNewMssg').html();
    var mssgBody = Mustache.render(tempMssg, {
        mssgFrom: newMssg.from,
        mssgText: newMssg.text,
        mssgTimestamp: formattedTimeNewMssg
    });

    jQuery('#olMessages').append(mssgBody);
});


socket_.on('newLocationMssg', function (newLocMssg) {
    var formattedTimeNewLoc = moment(newLocMssg.createdAtLoc).format('h:mm a');

    var tempLoc = jQuery('#scrNewLoc').html();
    var locBody = Mustache.render(tempLoc, {
        locFrom: newLocMssg.from,
        locUrl: newLocMssg.url,
        locTimestamp: formattedTimeNewLoc
    });

    jQuery('#olMessages').append(locBody);
});


jQuery('#formMessage').on('submit', function (prevent) {
    prevent.preventDefault();

    var messageTextbox = jQuery('[name=inputMessage]');

    socket_.emit('createMessage', {
        from: 'Nigger',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});



var locationBtn = jQuery('#btnLocation');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported.');
    } else if (navigator.geolocation) {
        locationBtn.attr('disabled', 'disabled').text('Sending location..');;
        navigator.geolocation.getCurrentPosition(function (successPos) {
            locationBtn.removeAttr('disabled').text('Khalid Send me your location');;
            socket_.emit('createLocationMssg', {
                latitude: successPos.coords.latitude,
                longtitude: successPos.coords.longitude
            });
        }, function () {
            locationBtn.removeAttr('disabled').text('Khalid Send me your location');
            alert('Cant do fetch location nigger.');
        });
    }
});


