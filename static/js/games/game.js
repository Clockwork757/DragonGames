var socket = io(options = {
    forceNew: true,
    autoConnect: false,
});

var username, opponent, game;

var username = localStorage.getItem('username');
console.log(username)

function getOpponentAndGame(){
    var url = window.location.href.split('/'),
    n = url.length - 1,
    last = url[n].split('-');
    opponent = last[0];
    game = last[1];
}

getOpponentAndGame()


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
})

socket.emit('join', {gamestring: `${username}:${opponent}:${game}`})

$(window).bind('beforeunload', function () {
    console.log('closing connection');
    //get('/games')
    $(window).unbind(this);
});