import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-236-214.us-east-2.compute.amazonaws.com:8000');

function joinGame(cb) {
	// register callbacks
	socket.on('joinedGame', data => cb('joinedGame',data));
	socket.on('toggledCircle', data => cb('toggledCircle',data));
	socket.on('playerJoined', data => cb('playerJoined',data));
	socket.on('playerQuit', data => cb('playerQuit',data));
	
	socket.emit('joinGame');
}

function toggleCircle(key,cb) {
	socket.emit('toggleCircle',key);
}

export { joinGame };
export { toggleCircle };