import express from 'express';
import bodyParser from 'body-parser';

var app = express();

const root = './static/';
const dirops = { root: root }

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(root));

app.get('/', (req, res) => {
    res.sendFile('index.html', dirops);
});

var port = 8080;


app.listen(port);
console.log(`Listening on port ${port}...`);