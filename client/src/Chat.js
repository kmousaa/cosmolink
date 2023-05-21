import React, { useEffect, useState, useRef } from 'react';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  

  const messageContainerRef = useRef(null);

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  // Handels sending message when enter clicked
  const handelKeydown = (e) => {
    if (e.key == "Enter"){
      sendMessage()
    }
  }





  useEffect(() => {
    // Function to handle receiving messages
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    // Attach the 'receive_message' event listener
    socket.on('receive_message', receiveMessage);

    // Scroll to the bottom of the message container when new messages are received
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off('receive_message', receiveMessage);
    };
  }, [socket, messageList]);

  return (
    <div className="flex flex-col h-screen mx-10 my-3  ">

      {/* Message container */}
      <div className="flex-1 overflow-y-auto px-4 py-2   ">
        {messageList.map((messageContent, index) => (
          <div
            className={`flex flex-col py-1 ${messageContent.author === username ? 'self-end items-end' : 'items-start'}`}
            key={index}
          >
          
            {/* Message author */}
            <p className="font-bold">{messageContent.author}</p>
            {/* Message content */}
            <p className="bg-blue-100 rounded-lg px-3 py-2">{messageContent.message}</p>
            {/* Message timestamp */}
            <span className="text-xs text-gray-100">{messageContent.time}</span>
          </div>
        ))}
      </div>

      
      {/* Message input */}
      <div className="p-4 bg-gray-100 grid-cols-3 rounded-full">
        <div className="flex items-center">
          {/* Input field for typing messages */}
          <input
            type="text"
            className="flex-1 rounded-full py-2 px-4 bg-white focus:outline-none"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={handelKeydown}
          />
          {/* Send button */}
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
