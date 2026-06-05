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

socket.on("join-room", (roomId,username) => {
  console.log("JOIN ROOM EVENT");
  console.log("roomId:", roomId);
  console.log("username:", username);
    socket.join(roomId);
    
    socket.roomId=roomId;
    socket.username=username;
   

     if (!activeUsers[roomId]) {
      activeUsers[roomId] = [];
    }

  if (!activeUsers[roomId].includes(username)) {
    activeUsers[roomId].push(username);
  }

    io.to(roomId).emit(
      "activeUsers",
      activeUsers[roomId]
    );
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.username,"left rooom",socket.roomId);

    const roomId = socket.roomId;
    const username = socket.username;

    if (roomId && activeUsers[roomId]) {

      activeUsers[roomId] =
        activeUsers[roomId].filter(
          (user) => user !== username
        );

      io.to(roomId).emit(
        "activeUsers",
        activeUsers[roomId]
      );
    }
  });
  
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

