function signup() {
    setError('')
    var username = $('#username').val(),
        password = $('#password').val(),
        password2 = $('#password2').val();
    if (password == password2) {
        post('/signup', {
            username: username,
            password: password
        }, handleSignup)
    } else {
        setError('Password entres do not match')
    }
}

function handleSignup(msg) {
    msg = JSON.parse(msg);
    if (msg['status'] == 0) {
        goTo(msg['redir']);
    } else {
        setError(msg['error']);
        console.log("Login Error: ", msg);
    }
}