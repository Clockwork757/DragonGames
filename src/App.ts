import express from 'express';
import bodyParser from 'body-parser';
import io, { Socket } from 'socket.io';
import session from 'express-session';
import { DB } from './Database/DB';
import { hash, compare } from 'bcrypt';
import { TicTacToe } from './Games/TicTacToe'
import { TicTacToeController, GameController } from './Games/GameController'
import { gameGetter } from './Games/GameGetter'

var app = express(),
    http = require('http'),
    server = http.createServer(app),
    socket = io.listen(server);

app.set('views', './static/');

// Serve js and css files for html to access
app.use(express.static('/static/js'));
app.use(express.static('/static/styles'));
app.use(express.static('/static/avatars'));

app.set('view engine', 'pug');
app.use(session({
    secret: 'DABONTHEHATERS'
}));

const root = './static/';
const dirops = { root: root }

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(root));

app.get('/', (req, res) => {
    res.redirect('/view/home');
    //res.render('home.pug')
    //res.sendFile('index.html', dirops);
});

const gen_user = { loggedIn: false }

app.get('/view/:page', (req, res) => {
    var page = req.params.page;
    req.session!.lastPage = req.session!.page
    req.session!.page = '/view/' + page
    var user;
    if (req.session!.user) {
        user = req.session!.user;
    } else {
        user = gen_user;
    }
    res.render(page, { user: user })
});

app.get('/view/user/:username', (req, res) => {
    var user: any;
    if (req.session!.user) {
        user = req.session!.user;
    } else {
        user = gen_user;
    }
    var username = req.params.username;
    var avatar = 'default.jpg';
    DB.once('userInfo:' + username, (msg) => {
        if (msg) {
            avatar = msg['avatar'];
            username = msg['username'];
        }
        res.render('profile', { username: username, avatar: avatar, user: user });
    })
    DB.getUserInfo(username);
})

app.post('/signup', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
    var lastPage = req.session!.lastPage || "/";
    if (['/view/login', '/view/signup'].includes(lastPage)) {
        lastPage = '/'
    }
    DB.once('signup:' + username, (msg) => {
        console.log(msg);
        if (msg) {
            console.log("logged in: " + username + " id: " + msg + " redirecting to " + lastPage);
            req.session!.user = { username: username, loggedIn: true };
            res.send({ redir: lastPage, status: 0 });
        }
        else {
            console.log("Couldn't sign up");
            res.send({ redir: '', status: 2, error: 'Unable to create Account' })
        }
    })
    hash(password, 10, function (err, hash) {
        if (err) {
            console.log("Could not hash password")
            res.send({ redir: '', status: 1, error: 'Unable to create Account' })
        } else {
            DB.signup(username, hash);
        }
    });;
})

app.post('/login', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
    var lastPage = req.session!.lastPage || "/";
    if (['/view/login', '/view/signup'].includes(lastPage)) {
        lastPage = '/'
    }
    DB.once('login:' + username, (msg) => {
        if (msg) {
            compare(password, msg['hpassword'], (err, correct) => {
                if (err) {
                    console.log(err);
                    return
                }
                if (correct) {
                    console.log("logged in: " + username + " redirecting to " + lastPage);
                    req.session!.user = { username: username, loggedIn: true, avatar: msg['avatar'] };
                    res.send({ redir: '/', status: 0 });
                } else {
                    res.send({ redir: '', status: 2, error: "Incorrect Password" });
                }
            });
        }
        else {
            console.log("Something went wrong logging in " + username);
            //req.session!.msg = "Invalid login";
            res.send({ redir: '', status: 1, error: "Incorrect Username or Password" })
        }
    });
    DB.login(username);
});

app.get('/games/lobby', (req, res) => {
    var user: any;
    if (!req.session!.user) {
        res.redirect('/view/login');
        return;
    } else {
        user = req.session!.user;
    }
    const username = req.session!.user['username'];
    DB.once('getChalllenges:' + username, (msg) => {
        if (msg) {
            res.render('games/lobby', { challengeInfo: msg, user: user });
        } else {
            res.render('games/lobby', { user: user, challengeInfo: {} });
        }
    });
    DB.getChallenges(username);
})

app.post('/challenge', (req, res) => {
    var username = req.session!.user.username,
        opponent = req.body.opponent,
        game = req.body.game;
    DB.once('challenge:' + username + opponent + game, (msg) => {
        if (msg) {
            res.redirect('/games/lobby');
        }
    })

    DB.challenge(username, opponent, game);
})

app.get('/games/chess', (req, res) => {

})

app.get('/games/tictactoe', (req, res) => {

})

app.get('/games/rps', (req, res) => {

})

// Store GameControllers in a dictionary to access if coming back to page or reloading
var games = new Map<string, GameController>();

app.get('/games/:opponent-:game', (req, res) => {
    var user: any;
    console.log(!req.session!.user)
    if (!req.session!.user) {
        res.redirect('/view/login');
        return;
    } else {
        user = req.session!.user;
    }
    var username = req.session!.user.username,
        opponent = req.params.opponent,
        game = gameGetter(req.params.game);
    var p1s = `${username}:${opponent}:${game.name}`
    var p2s = `${opponent}:${username}:${game.name}`
    var gc: GameController;
    if ((games.get(p1s) == undefined) || (games.get(p2s) == undefined)) {
        gc = new TicTacToeController(game, username, opponent, socket);
        games.set(p1s, gc);
        games.set(p2s, gc);
    } else {
        gc = games.get(p1s)!;
    }

    games.set(p1s, gc);
    games.set(p2s, gc);

    res.render('games/tictactoe', { user: user });
})
/*
socket.on('connection', (socket: Socket) => {
    console.log("got con");
})*/

app.get('/logout', (req, res) => {
    if (req.session!.user) {
        const username = req.session!.user['username'];
        req.session!.destroy((err) => {
            if (err) {
                console.log("Session delete error: " + err);
            } else {
                console.log("logged out: " + username);
            }
        });
    }
    res.redirect('/');
})

app.get('/whoami', (req, res) => {
    if (req.session!.user) {
        res.send(req.session!.user);
    } else {
        res.send(false)
    }
})


var port = process.env.PORT || 8080;

server.listen(port);
console.log(`Listening on port ${port}...`);