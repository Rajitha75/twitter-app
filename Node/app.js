// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
const Twit = require('twit');
const {mongoose} = require('./db.js');
var { Tweets } = require('./models/tweets.model');
var passport = require('passport');

const dev = process.env.NODE_ENV !== 'production'
var session = require('express-session');
// *** routes *** //
var routes = require('./routes/index.js');

var Twitter = new Twit({
  consumer_key:         'Zqzw4MILLto03SW0CKvwp8USH',
  consumer_secret:      'd4DYzUCooRFDtkKVFKeESS4zLrAGURzimP8VXV9a3ekv8craQY',
  access_token:         '1163881434097958913-tcKdluRK35w7C6vYBjM5URHaVx8OWt',
  access_token_secret:  'xKruv8MMkIgWOjtreqgJnSXO0sfG1OHQa4D50oBI7opC6'
  });
// *** express instance *** //
var app = express();
const cors = require('cors');
app.use(cors({ origin : "*" }));
var router = express.Router();
app.listen(3000 , ()=> console.log('server started at port 3000'));

var passportTwitter = require('./auth/twitter');

// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));

app.use(cookieParser());app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

app.get('/auth/twitter/callback', 
passportTwitter.authenticate('twitter', { 
                                successRedirect: '/success',
                                failureRedirect: '/login' }),
         function(req, res) {}); // route handler


    app.get('/auth/twitter/getsavedtweets', (req,res) => {
      Tweets.find((err, docs) => {
        console.log(docs)
          if(!err) { res.send(docs); }
          else{ console.log('Errors:' + JSON.stringify(err,undefined,2));}
      });
      });

      app.get('/auth/twitter/gethashtagsearchtweets', (req, res) => {
        console.log(req.query.search);
        var hashtag = req.query.search;
        Twitter.get('search/tweets', {  q: '#'+hashtag+' since:7 days', count: 100 }, function (err, data, response) {
          console.log(data.statuses)
          if(!err) { res.send(data.statuses); }
          })
        })  
        
        app.get('/auth/twitter/getlocationsearchtweets', (req, res) => {
          var location = req.query.search;
          console.log(location)
          Twitter.get('search/tweets', { q: 'location: '+location }, function (err, data, response) {
            console.log(data)
            if(!err) { res.send(data.statuses); }
          })
          })  


          app.get('/auth/twitter/gettweetshavingurl', (req, res) => {
            Twitter.get('search/tweets', { q: 'href since:7 days', count: 100 }, function (err, data, response) {
              console.log(data)
            if(!err) { res.send(data.statuses); }
          })

        });
 
app.get('/auth/twitter/gettweets', (req, res) => {
  Twitter.get('search/tweets', { q: 'since:7 days, count: 100' }, function (err, data, response) {
   for(var item of data.statuses) {
     var tweets = new Tweets({
        tweetid: item.id,
        id_str: item.id_str,
        text: item.text,
        source: item.source,
        place: item.place,
        createdat: item.created_at
      });
      
      tweets.save((err,doc) => {
          if(!err) { console.log('saved')}
          else{console.log(JSON.stringify(err,undefined,2))}
      })
   }
   
  })
});


        

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
