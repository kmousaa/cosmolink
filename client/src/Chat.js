import React, { useState } from 'react'

function Chat(socket, username , room) {

  const [currentMessage,setCurrentMessage] = useState()

  return (
    <div>

        <div className='chat-header'>
            <p>Live chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type="text" placeholder='...' onChange={(event) => {setCurrentMessage(event.target.value)}}/>
            <button>&#9658;</button>
        </div>
      
    </div>
  )
}

export default Chat
