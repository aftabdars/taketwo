// const { io } = require("socket.io-client");

const url = window.location.origin;
let socket = io.connect(url);
let playersClient = [];

function logIn() {
    let input = document.getElementById('name-input').value;
    socket.emit('log.in', {'name': input, 'id' : socket.id});
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('waiting-screen').style.display = 'block';
    playersClient.push({'name': input, 'id' : socket.id})
    // test showing player
    setallChairs();
}

socket.on('ready', ()=> {
    document.getElementById('start-button').style.display = 'block';
})

socket.on('getPlayers', (players)=> {
    playersClient = players;
})

socket.on('start', ()=> {
    document.getElementById('waiting-screen').style.display = 'none';
})

socket.on('opponentJoin', (data)=> {
    if(data['id'] == socket.id) return;

    playersClient.push(data);
    let name = data['name'];
    setChair(playersClient.length, name);
    console.log(data);
})

socket.on('opponentLeft', (data)=> {
    //working here (bugged)
    //delete children (cards) and make chairs invisible
    console.log(data);
    resetTable();
    playersClient.forEach((value, index) => {
        if (value['id'] == data['id']) {
            playersClient.splice(index, 1);
        }
        setallChairs();
    })

    let name = data['name'];
    setChair(playersClient.length, name);
    console.log(data);
})

function startGame() {
    socket.emit('start');
}

function setChair(number, name) {
    let chair = document.getElementById('chair-'+number);
    chair.firstElementChild.firstElementChild.innerHTML = name;
    chair.style.visibility = 'visible';
}

function setallChairs(){
    playersClient.forEach((value, index) => {
        setChair(index+1, value['name']);
    })
}

function removeChair(number, name) {
    let chair = document.getElementById('chair-'+number);
    chair.style.visibility = 'invisible';
}

function removeallChairs(){
    playersClient.forEach((value, index) => {
        removeChair(index+1, value['name']);
    })
}

function resetTable() {
    for(let i = 1; i<7; i++){
        e = document.getElementsByClassName('player-cards-' + i);
        child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }
    removeallChairs();
}