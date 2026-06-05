const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http =require("http");
const connectDB = require("./config/db");
const {Server} =require("socket.io")


dotenv.config();

connectDB();

const app = express();
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");

const server = http.createServer(app);
const activeUsers = {};

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});


const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user Connection",socket.id);

socket.on("join-room", (roomId, username) => {
  // Validate roomId and username
  if (!roomId || typeof roomId !== "string" || roomId.trim() === "") {
    socket.emit("error", "Invalid roomId");
    return;
  }
  if (!username || typeof username !== "string" || username.trim() === "") {
    socket.emit("error", "Invalid username");
    return;
  }

  socket.on("typing", ({ roomId, username }) => {
  socket.to(roomId).emit("user-typing", username);
  });

  socket.on("stop-typing", (roomId) => {
  socket.to(roomId).emit("user-stop-typing");
  });

  console.log("JOIN ROOM EVENT");
  console.log("roomId:", roomId);
  console.log("username:", username);
  
  socket.join(roomId);
  socket.roomId = roomId;
  socket.username = username;

  // Initialize room with empty object if not exists
  if (!activeUsers[roomId]) {
    activeUsers[roomId] = {};
  }

  // Track socket IDs per username
  if (!activeUsers[roomId][username]) {
    activeUsers[roomId][username] = new Set();
  }
  activeUsers[roomId][username].add(socket.id);

  // Emit list of usernames (keys with non-empty sets)
  const usernames = Object.keys(activeUsers[roomId]).filter(
    (user) => activeUsers[roomId][user].size > 0
  );
  io.to(roomId).emit("activeUsers", usernames);
});

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.username, "left rooom", socket.roomId);

    const roomId = socket.roomId;
    const username = socket.username;

    if (roomId && activeUsers[roomId] && activeUsers[roomId][username]) {
      // Remove this socket ID from the user's set
      activeUsers[roomId][username].delete(socket.id);

      // Delete username entry if set is empty
      if (activeUsers[roomId][username].size === 0) {
        delete activeUsers[roomId][username];
      }

      // Emit updated list of usernames
      const usernames = Object.keys(activeUsers[roomId]).filter(
        (user) => activeUsers[roomId][user].size > 0
      );
      io.to(roomId).emit("activeUsers", usernames);
    }
  });
  
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

