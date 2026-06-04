const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

// Save Message
router.post("/", async (req, res) => {
  try {
    const { roomId, username, text } = req.body;

    const message = await Message.create({
      roomId,
      username,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Messages by Room
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;