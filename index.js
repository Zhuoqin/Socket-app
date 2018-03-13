var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    const ip = socket.request.connection.remoteAddress;
    io.emit('chat message', ip + ' is connected');
    socket.on('chat message', function (msg) {
        io.emit('chat message', ip + '-> ' + msg);
    });

    socket.on('disconnect', function (data) {
        io.emit('chat message', ip + ' is disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
    