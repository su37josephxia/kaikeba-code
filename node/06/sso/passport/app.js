const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const login = require('./routes/login');
const checkToken = require('./routes/check-token');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/login', login);
app.use('/check_token', checkToken);

let port = process.env.PORT || 8080;
app.set('port', port);

let server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server passport listening on port: ${port}`);
});