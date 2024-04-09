# Cosmolink

[![Generic badge](https://img.shields.io/badge/language-javascript-orange.svg)](https://shields.io/)
[![GitLab last commit](https://img.shields.io/github/last-commit/kmousaa/Cosmolink)](https://img.shields.io/github/last-commit/kmousaa/Cosmolink)
[![Generic badge](https://img.shields.io/badge/completion-complete-blue.svg)](https://shields.io/)

Cosmolink is a real-time messaging application similar to Discord. It allows users to send live messages, images, videos, and audios using sockets. Users can join rooms by entering their name and a room ID, enabling group conversations with other users in the same room.



# Features

- **Real-time messaging:** Communicate with other users instantly using live messages.
- **Media sharing:** Send images, videos, and audios within the chat.
- **Room-based conversations:** Join specific rooms by entering a room ID to chat with other users in that room.
- **Simple interface: **Easy-to-use interface for a seamless messaging experience.
-** Scalable:** Rooms can accommodate multiple users, allowing for group conversations.

# Deployment

To deploy Cosmolink locally, follow these steps:

First Clone the repository: `git clone https://github.com/kmousaa/Cosmolink.git`

## Server
1) Navigate to the server folder: `cd Cosmolink/server`
2) Install dependencies: `npm install`
3) Start the server: `npm start`

## Client
1) Open a new terminal window/tab.
2) Navigate to the client folder: `cd Cosmolink/client`
3) Install dependencies: `npm install`
4) Start the client: `npm start`

Once both the server and client are running, open your browser and navigate to http://localhost:3000. Enter your name and the desired room ID to join a room and start chatting.

Note: Make sure you have Node.js and npm installed on your machine before running the application.

# Limitations:

- Media file size limitation: Currently, Cosmolink supports media files (images, audio, and videos) up to 1MB in size.

# Enjoy:
![](https://github.com/kmousaa/Cosmolink/blob/main/demo.gif)
