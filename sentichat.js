/*jshint esversion: 6 */

// Dependencies required for app
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
let users = [];

// Use port 3000 unless there exists a preconfigured port
app.set('port', process.env.PORT || 3000);

// Set up handlebars view engine

const handlebars = require('express3-handlebars')
    .create({ defaultLayout: '' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Static resources middleware
app.use(express.static(__dirname + '/public'));

// Route
app.get('/', function(req, res) {
    res.render('index.handlebars');
});

// Emits event from the server
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('send-username', function(username) {
        socket.username = username;
        users.push(username);
        console.log(users);
    });
});

// Listen on localhost:3000
http.listen(app.get('port'), function() {
    console.log('Express is listening at http://localhost:' + app.get('port'));
});