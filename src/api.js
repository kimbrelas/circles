import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-236-214.us-east-2.compute.amazonaws.com:8000');

function joinGame(cb) {
	socket.on('joinedGame', data => cb(null, data));
	socket.on('claimedCircle', data => cb(null, data));
	socket.on('playerJoined', data => cb(null, data));
	socket.on('playerQuit', data => cb(null, data));
	
	socket.emit('joinGame');
}

function claimCircle(key,cb) {
	socket.emit('claimCircle',key);
}

export { joinGame };
export { claimCircle };