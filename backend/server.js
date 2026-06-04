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
  console.log("User Connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

