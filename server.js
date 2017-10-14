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

io.on('connection', (client) => {
	// player joins game
    client.on('joinGame', () => {
	    players.push(client.id);
        
        console.log('player '+client.id+' is joining game');
        
        client.emit('joinedGame',{playerId:client.id,circles:circles});
        
        io.sockets.emit('playerJoined',{playerCount:players.length});
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
		
		    io.sockets.emit('playerQuit',{circles:circles,playerCount:players.length});
	    }
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
