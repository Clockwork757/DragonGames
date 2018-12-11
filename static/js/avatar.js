$(document).on("click", ".avatar", function (event) {
    var avatar = $(event.target).data('img'),
        username = localStorage.getItem('username');
    post('/user-edit/avatar', {
        avatar: avatar,
        username: username
    }, avatarChangeHandler)
});

function avatarChangeHandler(msg) {
    msg = JSON.parse(msg);
    if (msg['status'] == 0) {
        goTo(msg['redir']);
    } else {
        setError(msg['error']);
    }
}