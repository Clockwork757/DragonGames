var socket = io();

var username;
get('/whoami', setUsername, dataType='json')

function setUsername(s){
    username = s
}

function sendMove(){
    socket.send({player:username, x:0, y: 2})
}

socket.on('m', (msg) => {
    console.log(msg);
})

//console.log(username)

socket.emit('join')