var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');

//Instantiate an Express app
var app = express();

//Have the new app use the following helpers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Connect to the appropriate Mongo instance
var mongoose = require('mongoose'),
    mongooseConfig = require('./config/mongoose')[app.get('env')];

mongoose.connect(mongooseConfig.db);

//Set up static assets
//Make views accessible under 'views'
app.set('views', path.join(__dirname, 'views'));
//Make public static assets accessible without path
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/post'));

//This actually starts the http server 
var server = http.createServer(app);
server.on('listening', function() { console.log('Listening on port 3000'); });

server.listen(3000);
