import express from 'express';
import bodyParser from 'body-parser';
import io from 'socket.io';
import fs from 'fs';
import session from 'express-session';
import path from 'path';
import { TicTacToe } from './Games/TicTacToe';
import { DB } from './Database/DB';

var app = express(),
    http = require('http'),
    server = http.createServer(app),
    socket = io.listen(server);

app.set('views', './static/');

// Serve js and css files for html to access
app.use(express.static('/static/js'));
app.use(express.static('/static/styles'));

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

const gen_user = { loggedIn: false, username: "Default User" }

app.get('/view/:page', (req, res) => {
    var page = req.params.page;
    if (req.session!.lastpage) {
        res.write('Last page: ' + req.session!.lastPage + '. ');
    }
    req.session!.lastPage = '/view/' + page
    var user;
    if (req.session!.user){
        user = req.session!.user;
    }else{
        user = gen_user;
    }
    res.render(page, { user: user})
});

app.post('/users/new-account', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

})

var port = process.env.PORT || 8080;

var t = new TicTacToe();
t.placeO(0, 1);
console.log(t.toString());

DB.addListener('loggedin:u', (msg) => {
    console.log(msg)
})

/*
app.post('/login', function (req, res) {
    DB.once('loggedin:' + req.body.username, function (msg) {
        if (msg == 1) {
            req.session!.userid = req.body.username;
            return res.redirect('/getUsers');
        }
        else {
            req.session!.msg = "Invalid login";
            return res.redirect('/');
        }
    });
    DB.login(req.body.username, req.body.password);
});

DB.login("u", "p2");
DB.login("u", "p");*/

socket.on('connect', function (socket) {
    socket.on('ugh', function (msg) {
        console.log('message: ' + msg);
    });
});

server.listen(port);
console.log(`Listening on port ${port}...`);