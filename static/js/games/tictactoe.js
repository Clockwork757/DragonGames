function sendMove(x, y) {
    socket.emit('move', {
        player: username,
        x: x,
        y: y
    })
}

$(".board-tile").on(() => {
    console.log("clicked")
    console.log($this.data('x'))
})

socket.emit('join')