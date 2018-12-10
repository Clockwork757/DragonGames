var socket = io();

var username;
get('/whoami', setUsername, dataType = 'json')

function setUsername(j) {
    username = j['username']
}

function setBoard(s) {
    $('#board').html(s)
}

socket.on('debug', (msg) => {
    console.log(msg);
})

socket.on('state', (state) => {
    console.log("got state from server: ");
    console.log(state)
    setBoard(state['boardState']);
    console.log(state['gameState']);
})