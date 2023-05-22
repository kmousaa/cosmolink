import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const socket = io.connect('http://localhost:3001');

const gradients = [
  { name: 'Cosmos', gradient: 'bg-gradient-to-r from-violet-500 to-fuchsia-500', solid: 'bg-violet-500' },
  { name: 'Sunset', gradient: 'bg-gradient-to-r from-orange-500 to-pink-500', solid: 'bg-orange-500' },
  { name: 'Forest', gradient: 'bg-gradient-to-r from-green-500 to-emerald-500', solid: 'bg-green-500' },
  { name: 'Twilight', gradient: 'bg-gradient-to-r from-purple-600 to-indigo-600', solid: 'bg-purple-600' },
];

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(gradients[0]);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      const data = {
        username: username,
        room: room,
      };
      socket.emit('join_room', data);
    }
  };

  const goBack = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    socket.on('joined_room', (data) => {
      if (data === 'joined') {
        setShowChat(true);
      } else if (data === 'error') {
        console.log('ERROR');
      }
    });
  }, []);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <>
      <div className={`flex flex-col h-screen ${selectedTheme.gradient}`}>
        
        <div className={` py-4 px-8 flex items-center justify-between `}>
          <div className={`text-white text-2xl font-bold cursor-pointer`} onClick={goBack}>
            Cosmolink
          </div>
          <div className="mr-4">
            <SettingsButton handleThemeChange={handleThemeChange} selectedTheme={selectedTheme} />
          </div>
        </div>

        {showChat ? (
          <div className="flex-grow overflow-y-auto">
            <Chat socket={socket} username={username} room={room} />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-1/4">
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
                    className={`text-white px-4 py-2 rounded-md shadow-sm w-full ${selectedTheme.solid}`}
                  >
                    Join a Room
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const SettingsButton = ({ handleThemeChange, selectedTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const selectTheme = (theme) => {
    handleThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button className="focus:outline-none" onClick={toggleSettings}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${selectedTheme === gradients[0] ? 'text-white' : 'text-gray-600'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4a8 8 0 100 16 8 8 0 000-16z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {gradients.map((color) => (
              <button
                key={color.name}
                onClick={() => selectTheme(color)}
                className={`block px-4 py-2 text-sm ${
                  selectedTheme === color ? 'text-white' : 'text-gray-700'
                } hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
