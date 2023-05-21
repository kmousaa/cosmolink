import './App.css';
import io from 'socket.io-client';
import Chat from "./Chat";
import {useState} from "react"
import 'tailwindcss/tailwind.css';

// create socket.io server (frontend -> backend)
const socket = io.connect("http://localhost:3001")

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  // establish connection between current logged in user and room
  const joinRoom = () => {

    if (username !== "" && room !== ""){
      socket.emit("join_room",room)
    }

  }

  return (


  
    <div className="App">

      <div id="DisplayCard" className={'bg-slate-300 rounded-md shadow-md'}> hello </div>
      


      <h3> Join Chat</h3>
      
      <div>
        <input type="text" placeholder="Name..." onChange={(event) => { setUsername(event.target.value) }} className="mb-2" />
      </div>
      <div>
        <input type="text" placeholder="Room ID..." onChange={(event) => { setRoom(event.target.value) }} className="mb-2" />
      </div>
      <div>
        <button onClick={joinRoom} className="bg-white px-4 py-2 rounded-md shadow-sm">Join a Room</button>
      </div>
     
      <Chat socket ={socket} username={username} room={room} />

 
      
    </div>
  );
}

export default App;
