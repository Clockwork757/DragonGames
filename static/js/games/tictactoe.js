function sendMove(x, y) {
    socket.emit('move', {
        player: username,
        x: x,
        y: y
    })
}

socket.emit('join')
