const express = require("express");
const router = express.Router();

const Room = require("../models/Room");

// Create Room
router.post("/create-room", async (req, res) => {
  try {
    const { roomName, description } = req.body;

    const roomExists = await Room.findOne({ roomName, });

    if (roomExists) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomName,
      description,
    });

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;