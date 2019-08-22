const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/CrudDb', { useNewUrlParser: true }, function(err) { console.log(err); }) 

mongoose.connect('mongodb://localhost:27017/twitterapp', (err) => {
    if(!err)
     console.log('MongoDB connected succeeded'); 
     else
     console.log(JSON.stringify(err,undefined,2))
    }) 

module.exports = mongoose;