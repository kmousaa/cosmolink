import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from "./Chat";
import { useState } from "react";
import 'tailwindcss/tailwind.css';


// create socket.io server (frontend -> backend)
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  // establish connection between current logged in user and room
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <>

 

    <div className="flex flex-col h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
    

      {/* Menubar */}
      <div className="bg-white py-4 px-8 flex items-center justify-between">
        <div className="text-violet-500 text-2xl font-bold">Cosmolink</div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center h-1/3">
        <div className="text-white text-6xl font-bold mb-4 font-major-mono-display">Cosmolink</div>
        <div className="flex items-center">
          <div className="mr-2 text-white">Interact with the cosmos</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Central box */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="rounded-md shadow-md bg-white p-8">
          <div className="mb-4 text-2xl font-bold text-center">Join Chat</div>
          <div>
            <input
              type="text"
              placeholder="Name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <button
              onClick={joinRoom}
              className="bg-violet-500 text-white px-4 py-2 rounded-md shadow-sm w-full"
            >
              Join a Room
            </button>
          </div>
        </div>
      </div>

      {/* <Chat socket={socket} username={username} room={room} /> */}
    </div>
    </>
  );
}

export default App;
