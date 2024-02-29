const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("A new client connected to the server");
  socket.on("chat message", (msg) => {
    console.log("Received message: ", msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
