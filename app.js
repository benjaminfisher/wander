
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Wander listening on port " + app.get('port'));
});

app.get('/', function(req, res){res.render('index')});

// Socket.IO initialization
var io = socketio.listen(server),
	users = [];

// Configure socket connection event handler
io.on('connection', function(socket){
	// Register new user
	socket.emit('new', {
		'user': users.length+1,
		'color': "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")",
		'top': Math.floor(Math.random()*500),
		'left': Math.floor(Math.random()*500),
	})
})