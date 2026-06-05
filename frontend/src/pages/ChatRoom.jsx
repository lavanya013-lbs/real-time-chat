import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

function ChatRoom() {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);

  const rawUsername = localStorage.getItem("username");
  const username = rawUsername && rawUsername.trim() ? rawUsername.trim() : null;
  const navigate = useNavigate();

  useEffect(() => {
    // Only join room if username is valid
    if (!username) {
      socket.emit("error", "Username is required");
      return;
    }

    socket.emit("join-room", roomId, username);
    
    socket.on(
    "activeUsers",
    (users) => {
    setActiveUsers(users);
    }
    
    );
    


    const fetchData = async () => {
      try {
        // Fetch room name
        const roomRes = await axios.get(
          "http://localhost:5000/api/rooms"
        );

        const room = roomRes.data.find(
          (r) => r._id === roomId
        );

        if (room) {
          setRoomName(room.roomName);
        }

        // Fetch old messages
        const msgRes = await axios.get(
          `http://localhost:5000/api/messages/${roomId}`
        );

        setMessages(msgRes.data);
      } catch (error) {
        console.error(error);
      }
    };



    fetchData();

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("activeUsers");
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [roomId]);

useEffect(() => {
  const messagesBox = document.querySelector(".messages");

  if (messagesBox) {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      username,
      text: message,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        msgData
      );

      socket.emit("send-message", msgData);

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-box">
      
      <h2>{roomName}</h2>
      <button className="back-btn" onClick={()=>navigate("/")}>
        Back
      </button>

      <div className="users-list">
      <p>
        🟢 Online : {activeUsers.join(" , ")}
      </p>
        </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
           key={index} className={
            msg.username === username? "my-message": "message"
        }    
        >
            <strong>{msg.username}</strong>: {msg.text}
          </div>
        ))}
      </div>
    
    <div className="input-area">
      <input
      type="text"
      placeholder="Type message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>
      </div>
    </div>
  );
}



export default ChatRoom;