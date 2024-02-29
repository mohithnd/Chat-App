const express = require("express");
const path = require("path");
const http = require("http");
const webSocket = require("ws");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const wss = new webSocket.WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("A new client connected to the server");
  ws.on("message", (message) => {
    console.log(`Message Received: ` + message.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === webSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
  ws.on("close", () => {
    console.log("A client disconnected from the server");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
