var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = new express();
var port = process.env.PORT || 5050;

//var UserModel = require('./corlateSchema.js');

var authRoutes = require('./routes/authRoutes');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'xz_passport_auth'}));

require('./passport')(app);

console.log(__dirname);

//app.use('/', express.static(__dirname + './public'));
//app.use('/test.html', express.static(__dirname + './public/test.html'));

app.get('/', function(req, res){
    // You should use one of line depending on type of frontend you are with
  res.sendFile(__dirname + '/public/test.html'); //if html file is root directory
  //res.sendFile("index.html"); //if html file is within public directory
});

app.use('/auth', authRoutes);

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
