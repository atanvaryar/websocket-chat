const socket = require("socket.io");

var socketModule = function(server) {
  const io = socket(server);

  io.on("connection", socket => {
    console.log("id do socket: ", socket.id);

    //evento do chat
    socket.on("chat", data => {
      io.sockets.emit("chat", data);
    });

    //evento de digitacao (mostra aos outros sockets quem esta digitando)
    socket.on("digitando", data => {
      socket.broadcast.emit("digitando", data);
    });

    socket.on("nao-digitando", () => {
      socket.broadcast.emit("nao-digitando");
    });
  });
};

module.exports = socketModule;
