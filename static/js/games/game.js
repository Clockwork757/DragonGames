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

function setTurnNotif(s) {
    $('.turn-notif').html(`\t${s}\t`);
}

function setVersus(s) {
    $('#versus').html(s);
}

socket.on('debug', (msg) => {
    console.log(msg);
})

var first = true;

socket.on('state', (gameState) => {
    state = gameState;
    setTurnNotif('');
    if (first) {
        setVersus(`Versus ${opponent}`);
        playerN = state['players'].indexOf(username);
        first = false;
    }
    if (playerN == state['turn']) {
        setTurnNotif("It\'s your turn");
    }
    setBoard(state['boardState']);
    if (state['gameState'] != 'prog') {
        var winner = -1;
        if (state['gameState'] == 'p1') {
            winner = 0;
        } else if (state['gameState'] == 'p2') {
            winner = 1
        } else if (state['gameState'] == 'tie') {
            console.log('tie');
            setTurnNotif('Tie!');
        }
        console.log(winner);
        if (winner == playerN) {
            setTurnNotif("You won!");
        } else {
            setTurnNotif("You lost!");
        }
        socket.emit('gameOver', {
            username: username,
            opponent: opponent,
            game: game,
        })
        socket.close();
    }
})

// Server has a map of gamestrings to gamecontrollers, both 
socket.emit('join', {
    gamestring: `${username}:${opponent}:${game},${opponent}:${username}:${game}`
}, (err) => {
    console.log(err)
})