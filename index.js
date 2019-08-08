var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    // Code to send the hand shake for successful connection.
    socket.emit('connection_status', { status: 'CONNECTION_ESTABLISHED' });

    // Code to broadcast the face recognition event.
    socket.on('face_recognised', function (data) {
        socket.broadcast.emit('face_recognised', data);
    });

    // Code to end the conversation
    socket.on('end_conversation', function(){
        socket.broadcast.emit('end_conversation');
    })

    // Code to kill the conversation in between.
    socket.on('kill_conversation', function(){
        socket.broadcast.emit('kill_conversation');
    })
});

server.listen(3333, function(){
    console.log("Server started at port: 3333");
});