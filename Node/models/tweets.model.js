var mongoose = require('mongoose');

var Tweets = mongoose.model('tweets', {
    tweetid: {type: String, required: true, max: 100},
    id_str: {type: Number, required: true},
    text: {type: String},
    source: {type: String},
    place: {type: String},
    createdat: {type: String}
});

module.exports = {Tweets : Tweets};