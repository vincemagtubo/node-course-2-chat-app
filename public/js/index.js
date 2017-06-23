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

    jQuery('#olMessages').append(li);
});

socket_.on('newLocationMssg', function (newLocMssg) {
    var li = jQuery('<li></li>');
    var aTag = jQuery('<a target="_blank">Current location, <i>nigger.</i></a>');

    li.text(`${newLocMssg.from}: `);
    aTag.attr('href', newLocMssg.url);

    li.append(aTag);
    jQuery('#olMessages').append(li);
});


jQuery('#formMessage').on('submit', function (prevent) {
    prevent.preventDefault();
    socket_.emit('createMessage', {
        from: 'Nigger',
        text: jQuery('[name=messageOne]').val()
    }, function () {

    });
});


var locationBtn = jQuery('#btnLocation');

locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported.');
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (successPos) {
            socket_.emit('createLocationMssg', {
                latitude: successPos.coords.latitude,
                longtitude: successPos.coords.longitude
            });
        }, function () {
            alert('Cant do fetch location nigger.');
        });
    }
});


