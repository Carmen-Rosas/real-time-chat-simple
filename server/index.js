import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});