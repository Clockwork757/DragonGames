function signup() {
    var username = $('#username').val(),
        password = $('#password').val();
    post('/signup', {
        username: username,
        password: password
    }, handleSignup)
}

function handleSignup(msg) {
    if (msg['status'] == 0) {
        goTo(msg['redir']);
    } else {
        setError(msg['error']);
        console.log("Login Error: ", msg);
    }
}