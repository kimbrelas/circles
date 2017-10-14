import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-236-214.us-east-2.compute.amazonaws.com:8000');

function joinGame(cb) {
	socket.on('joinedGame', data => cb(data));
	socket.on('toggledCircle', data => cb(data));
	socket.on('playerJoined', data => cb(data));
	socket.on('playerQuit', data => cb(data));
	
	socket.emit('joinGame');
}

function toggleCircle(key,cb) {
	socket.emit('toggleCircle',key);
}

export { joinGame };
export { toggleCircle };