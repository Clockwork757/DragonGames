function challenge() {
    setError('')
    var opponent = $('#opponent').val(),
        game = $('#game').val();
    post('/challenge', { opponent: opponent, game: game })
}