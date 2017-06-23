var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct message obj', () => {
        var resFrom = 'Sample From';
        var resText = 'Text sample';
        var message = generateMessage(resFrom, resText);

        expect(message).toInclude({
            from: resFrom,
            text: resText
        })
        expect(message.createdAt).toBeA('number');
       
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var resFrom = 'Sample From shit'
        var resLatitude = 123;
        var resLongtitude = 234;
        var resUrl = 'https://www.google.com/maps?q=123,234';
        var message = generateLocationMessage(resFrom, resLatitude, resLongtitude);
        
        expect(message).toInclude({
            from: resFrom,
            url: resUrl
        });
        expect(message.createdAt).toBeA('number');
        

    });
});