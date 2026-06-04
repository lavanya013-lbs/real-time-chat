import { Routes, Route } from "react-router-dom";
import RoomList from "./pages/RoomList";
import ChatRoom from "./pages/ChatRoom";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoomList />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />
    </Routes>
  )
}

export default App;