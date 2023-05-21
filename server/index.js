// index.js - entry point for server

// Import required libraries
const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

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

  console.log("User Connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id}, joined room ${data}`)
  });

  socket.on("send_message", (data) => {
    
    socket.to(data.room).emit("receive_message",data)
   
  });



  // Handle "disconnect" event when a user disconnects
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
  });

});

// Start the server and listen on port 3001
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
