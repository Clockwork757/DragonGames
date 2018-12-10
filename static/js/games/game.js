var socket = io(options = {
    forceNew: true,
    autoConnect: false,
});

var username = localStorage.getItem('username'),
    opponent = localStorage.getItem('opponent'),
    game = localStorage.getItem('game'),
    playerN, state;

function setBoard(s) {
    $('#board').html(s);
}

function setTurnNotif(s){
    $('.turn-notif').html(`\t${s}\t`);
}

function setVersus(s){
    $('#versus').html(s);
}

socket.on('debug', (msg) => {
    console.log(msg);
})

first = true;

socket.on('state', (gameState) => {
    state = gameState;
    setTurnNotif('');
    if (first) {
        setVersus(`Versus ${opponent}`);
        playerN = gameState['players'].indexOf(username);
        first = false;
    }
    if (playerN == gameState['turn']){
        setTurnNotif("It\'s your turn");
    }
    setBoard(gameState['boardState']);
})

// Server has a map of gamestrings to gamecontrollers, both 
socket.emit('join', {
    gamestring: `${username}:${opponent}:${game},${opponent}:${username}:${game}`
}, (err) => {
    console.log(err)
})

/*
$(window).on('beforeunload', () => {
    localStorage.removeItem("opponent");
    localStorage.removeItem("game");
});*/