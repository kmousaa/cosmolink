// index.js - entry point for server

// Import required libraries
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// stores {username, socket id, room}
const users = [];


// Create an HTTP server for the React app (localhost)
const server = http.createServer(app);

// Create a socket.io server (backend -> frontend)
// Cors allows connection from port 3000 (Port)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Listen to the "connection" event
io.on("connect", (socket) => {

  // console.log("User Connected", socket.id);

  socket.on("join_room", (data) => {
    // Check if the username is already taken
    const existingUser = users.find(user => user.username === data.username);
    if (existingUser) {
     
      socket.emit("joined_room", "error");

    } else {
      users.push({ username: data.username, socketId: socket.id, room: data.room });
      socket.join(data.room);
      socket.emit("joined_room", "joined");
      
    }
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });



  socket.on("start_user_typing", (data) => {
    socket.to(data.room).emit("start_typing", data);
  });

  socket.on("stop_user_typing", (data) => {
    socket.to(data.room).emit("end_typing", data);
  });

  // Handle "disconnect" event when a user disconnects
  socket.on("disconnect", () => {
   
    // Remove the disconnected user from the user list
    const index = users.findIndex(user => user.socketId === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});

// Start the server and listen on port 3001
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
