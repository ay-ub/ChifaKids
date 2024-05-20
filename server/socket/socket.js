const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", async (socket) => {
  console.log("userConnected", socket.id);

  socket.on("disconnect", async () => {
    console.log("userdisconnected", socket.id);
  });
});

module.exports = {
  app,
  io,
  server,
};
