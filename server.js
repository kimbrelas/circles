const io = require('socket.io')();

// player database
var players = [];

// circle database
var circles = [];
for(var x = 1;x <= 15;x++) {
	for(var y = 1;y <= 8;y++) {
		var statuses = ['theirs','mine','empty'];
		var status = statuses[Math.floor(Math.random() * statuses.length)];
		
		circles.push({'playerId':null,'x':x,'y':y});
	}
}

// clear out orphaned circles once per minute
setInterval(function() {
	for(var i = 0; i < circles.length; i++) {
		if(circles[i].playerId !== null && players.indexOf(circles[i].playerId) <= -1) {
			circles[i].playerId = null;
			io.sockets.emit('toggledCircle',{circles:circles});
			console.log('removed circle '+i+' for player '+circles[i].playerId);
		}
	}
}, 60000);

io.on('connection', (client) => {
	// player joins game
    client.on('joinGame', () => {
	    players.push(client.id);
	    
        client.emit('joinedGame',{playerId:client.id,circles:circles,playerCount:players.length});
        
        client.broadcast.emit('playerJoined',{playerCount:players.length});
    });
    
    // player toggles circle
    client.on('toggleCircle', (key) => {
	    var circle = circles[key];
	    
	    if(circle.playerId === null) {
		    circles[key].playerId = client.id;
	    } else if(circle.playerId === client.id) {
		    circles[key].playerId = null;
	    }
	    
	    io.sockets.emit('toggledCircle',{circles:circles});
    });
    
    // player quits game
    client.on('disconnect', () => {
	    var playerIndex = players.indexOf(client.id);
	    if(playerIndex > -1) {
		    players.splice(playerIndex,1);
		    
		    for(var i = 0; i < circles.length; i++) {
				if(circles[i].playerId === client.id) {
					circles[i].playerId = null;
				}
			}
		
		    client.broadcast.emit('playerQuit',{circles:circles,playerCount:players.length});
	    }
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
