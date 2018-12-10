const express = require('express');
const socket = require('./socket');

// app
const app = express();
const port = process.env.port || 3000
const server = app.listen(port, function() {
    console.log('subiu o server na porta ' + port);
})

app.use(express.static('public'));

// websocket
socket(server);

// var io = socket(server);

// io.on('connection', (socket) => {
//     console.log('id do socket: ', socket.id);

//     //evento do chat
//     socket.on('chat', (data) => {
//         io.sockets.emit('chat', data);
//     });

//     //evento de digitacao (mostra aos outros sockets quem esta digitando)
//     socket.on('digitando', (data) => {
//         socket.broadcast.emit('digitando', data);
//     });

//     socket.on('nao-digitando', () => {
//         socket.broadcast.emit('nao-digitando');
//     })
// });