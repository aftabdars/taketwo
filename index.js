const GameLogic = require('./server/GameLogic');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const game = new GameLogic.Game();
var joinedPlayers = 0;
app.use(express.static(__dirname + "/client/"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
    if(joinedPlayers == 6) return;
    socket.emit('getPlayers', game.players)
    socket.on('log.in', (data)=>{
        game.join(data);
        joinedPlayers++;
        //socket radio emit opponent and then add to chair on client side if socket id isnt yourself
        socket.broadcast.emit('opponentJoin', data)
        if (joinedPlayers > 1) socket.emit('ready');
    })

    socket.on('start', ()=> {
        //some game function
        io.emit('start');
    })

    console.log('a user connected');
    socket.on('disconnect', () => {
        game.disconnect({'id' : socket.id});
        joinedPlayers--;

        socket.broadcast.emit('opponentLeft', {'id': socket.id});
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});



// const game = new GameLogic.Game();
// game.shuffle();
// console.log(game);


//add player join functionality tomorrow