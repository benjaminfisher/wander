
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
var io = socketio.listen(server);

// Configure socket connection event handler
io.on('connection', function(socket){
	// Register new user
	socket.on('newuser', function(){
		socket.color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
		socket.top = Math.floor(Math.random()*500);
		socket.left = Math.floor(Math.random()*500);
		socket.set("id", io.sockets.manager.server._connections, function(){
			socket.emit("ready", {
				id: socket.id,
				color: socket.color,
				top: socket.top,
				left: socket.left
			});
		});
		
		socket.broadcast.emit('new', {
			id: socket.id,
			color: socket.color,
			top: socket.top,
			left: socket.left
		})
	})
	
	socket.on('up', function(data){
		socket.broadcast.emit('up', {user: socket.id, pos: data.position});
	})
	
	socket.on('left', function(data){
		socket.broadcast.emit('left', {user: socket.id, pos: data.position});
	})
	
	socket.on('down', function(data){
		socket.broadcast.emit('down', {user: socket.id, pos: data.position});
	})
	
	socket.on('right', function(data){
		socket.broadcast.emit('right', {user: socket.id, pos: data.position});
	})
})