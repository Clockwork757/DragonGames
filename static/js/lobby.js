function challenge() {
    setError('')
    var opponent = $('#opponent').val(),
        game = $('#game').val();
    post('/challenge', {
        opponent: opponent,
        game: game
    }, handleChallenge)
}

function handleChallenge(msg) {
    msg = JSON.parse(msg);
    if (msg['status'] == 0) {
        goTo(msg['redir']);
    } else {
        setError(msg['error']);
        console.log("Error challening: ", msg);
    }
}

$(document).on("click", ".challenge-button", function (event) {
    var opponent = $(event.target).data('opponent'),
        game = $(event.target).data('game');
    localStorage.setItem('opponent', opponent);
    localStorage.setItem('game', game);
    console.log(localStorage.opponent);
    goTo(`/games/${opponent}-${game}`);
});