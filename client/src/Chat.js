import React, { useEffect, useState, useRef } from 'react';
import Image from './Image';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState(null);

  const messageContainerRef = useRef(null);

  const sendMessage = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          room: room,
          author: username,
          type: 'file',
          mimeType: file.type,
          fileName: file.name,
          message: reader.result,
          time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        socket.emit('send_message', fileData);
        setMessageList((list) => [...list, fileData]);
        setCurrentMessage('');
        setFile(null);
        setFileSelected(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      if (currentMessage.trim() !== '') {
        const messageData = {
          room: room,
          author: username,
          type: 'text',
          message: currentMessage.trim(),
          time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage('');
      }
    }
  };

  const selectFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCurrentMessage(selectedFile.name);
      setFile(selectedFile);
      setFileSelected(true);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
  
    socket.on('receive_message', receiveMessage);
  
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  
    // Scroll to bottom when messageList changes
    const messageContainer = messageContainerRef.current;
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
  
    return () => {
      socket.off('receive_message', receiveMessage);
    };
  }, [socket, messageList]);
  

  const renderMessage = (messageContent, index) => {
    if (messageContent.type === 'file') {
      const blob = new Blob([messageContent.message], { type: messageContent.mimeType });
      return (
        <div className={`flex flex-col py-1 ${messageContent.author === username ? 'self-end items-end' : 'items-start'}`} key={index}>
          <p className="font-bold">{messageContent.author}</p>
          <Image fileName={messageContent.fileName} blob={blob} />
          <span className="text-xs text-gray-100">{messageContent.time}</span>
        </div>
      );
    } else {
      return (
        <div className={`flex flex-col py-1 ${messageContent.author === username ? 'self-end items-end' : 'items-start'}`} key={index}>
          <p className="font-bold">{messageContent.author}</p>
          <p className="bg-blue-100 rounded-lg px-3 py-2">{messageContent.message}</p>
          <span className="text-xs text-gray-100">{messageContent.time}</span>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen mx-10 my-3">
      <div className="flex-1 overflow-y-auto px-4 py-2" ref={messageContainerRef}>
        {/* render messages array */}
        {messageList.map((messageContent, index) => renderMessage(messageContent, index))}
      </div>
      <div className="p-4 bg-gray-100 grid-cols-3 rounded-full">
        <div className="flex items-center">
          {/* add file */}
          <label className={`mr-3 px-4 py-2 ${fileSelected ? 'bg-green-300' : 'bg-gray-300'} text-white rounded-full focus:outline-none`}>
            <div className="font-bold">{fileSelected ? '✓' : '+'}</div>
            <input onChange={selectFile} type="file" className="hidden" />
          </label>

          {/* textbox */}
          <input
            type="text"
            className="flex-1 rounded-full py-2 px-5 bg-white focus:outline-none"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyDown={handleKeydown}
          />

          {/* send button */}
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
