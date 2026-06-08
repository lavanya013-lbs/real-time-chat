import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

function RoomList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const roomDescriptions = {
  "General": "General discussions and networking",
  "Data Science": "Discuss AI, ML and Data Analytics",
  "Full Stack": "Frontend, Backend and MERN Stack",
};
    const createRoom = async () => {
  if (!newRoomName.trim()) {
    alert("Please enter room name");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/rooms/create-room", {
      roomName: newRoomName,
      description: newDescription,
    });

    setNewRoomName("");
    setNewDescription("");

    fetchRooms();

    alert("Room created successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to create room");
    }
  };
  

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "https://real-time-chat-ea0b.onrender.com/api/rooms"
      );

      setRooms(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const joinRoom = (room) => {
    if (!username.trim()) {
    alert("Please enter a username");
    return;
  }
    localStorage.setItem("username", username);

    navigate(`/chat/${room._id}`);
  };

  return (
    <div className="listroom container">
      <h1>Real Time Chat App</h1>

      

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <h2>Available Rooms</h2>

      {rooms.map((room) => (
        <div key={room._id} className="room-card">
          <div>
          <h3>{room.roomName}</h3>
          <p>{roomDescriptions[room.roomName] || room.description || "No description available."}</p>
          </div>

          <button onClick={() => joinRoom(room)}>
            Join
          </button>
        </div>
      ))}

      <div className="create-room-card">
  <h2>Create Room</h2>

  <input
    type="text"
    placeholder="Room Name"
    value={newRoomName}
    onChange={(e) => setNewRoomName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Room Description"
    value={newDescription}
    onChange={(e) => setNewDescription(e.target.value)}
  />

  <button onClick={createRoom}>
    Create Room
  </button>
</div>
      

    </div>
  );
}

export default RoomList;
