var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../client/multi.html'));
});

app.use(express.static(path.join(__dirname, '/../client'))); //  "public" off of current is root

// Count how many are online
var clientSockets = {};

var player = require('./player.js');
var room = require('./room.js');

console.dir(player);

var currentRoom = room.create('theOneAndOnly');

io.on('connection', function(socket){
	clientSockets[socket.id] = socket;

	var player = player.create(socket.id);
	
	socket.emit('JOINED', 'A New player joined....');
	io.emit('onlinePlayers', clientSockets.length);

	// On Player Update, Change Board Data
	// Emit new board (maybe a interval?)

	socket.on('action', function(msg){
		console.log(msg);
	    io.emit('action', msg);
	});

	socket.on('disconnect', function(){
		// todo : remove player from game
		player.remove();
	});

});

var port = process.env.PORT || 3000;
http.listen(port, function(){
	console.log('listening on *:' + port);
});