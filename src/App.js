import React, { useState, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { MdInsertEmoticon } from 'react-icons/md';
import './App.css';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const App = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = {
      user: randomUser,
      message: message,
      likes: 0
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  const handleLike = (index) => {
    const updatedMessages = [...chatMessages];
    updatedMessages[index].likes += 1;
    setChatMessages(updatedMessages);
  };

  const handleEmojiSelect = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setSelectedEmojis([...selectedEmojis, emoji]);
    setMessage(message + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="message-thread">
          {chatMessages.map((chat, index) => (
            <div key={index} className="message">
              <div className="user">{chat.user}</div>
              <div className="content">{chat.message}</div>
              <div className="likes">
                Likes: {chat.likes}
                <button onClick={() => handleLike(index)}>Like</button>
              </div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={toggleEmojiPicker}>
            <MdInsertEmoticon />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiSelect} disableSearchBar disableSkinTonePicker />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;