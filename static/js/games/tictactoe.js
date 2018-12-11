function sendMove(x, y) {
    socket.emit('move', {
        player: username,
        x: x,
        y: y
    })
}

socket.open();

$(document).on("click", ".TicTacToe-tile-image", function (event) {
    var x = $(event.target).data('x'),
        y = $(event.target).data('y');
    sendMove(x,y);
});
