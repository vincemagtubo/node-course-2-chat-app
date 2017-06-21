var expect = require('expect');

var {generateMessage} = require('./message.js');


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