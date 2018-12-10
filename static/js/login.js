function login() {
    setError('');
    var username = $('#username').val(),
        password = $('#password').val();
    post('/login', {
        username: username,
        password: password
    }, handleLogin)
}

function handleLogin(msg) {
    msg = JSON.parse(msg);
    if (msg['status'] == 0) {
        goTo(msg['redir']);
        localStorage.setItem("username", msg['user']['username']);
    } else {
        setError(msg['error']);
        console.log("Login Error: ", msg);
    }
}