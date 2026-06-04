import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoomList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");

  

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rooms"
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
    <div className="listroom">
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
          <h3>{room.roomName}</h3>

          <button onClick={() => joinRoom(room)}>
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoomList;