var moment = require('moment');

var createdAt = 12342;
var date = moment(createdAt);
console.log(date.format('ddd, MMM Do YYYY, kk:mm:ss '));

