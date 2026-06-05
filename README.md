# Real Time Chat Application

A full-stack real-time chat application built using React, Node.js, Express.js, MongoDB, and Socket.IO.

## Features

* Real-time messaging
* Multi-room chat support
* Message persistence using MongoDB
* Responsive user interface
* Socket.IO integration
* Room joining functionality

## Tech Stack

**Frontend**

* React
* React Router DOM
* Axios
* CSS

**Backend**

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev

```

## page1
room list page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8bfea3ba-9a06-4446-9f6b-bed23fee13cf" />

## page2
chat page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4c1be02a-bf74-4b35-a11c-bf2b09989625" />

## Active Users Feature

This chat application now supports real-time online user tracking.

How it works

- Users join a chat room using Socket.IO.
- The server tracks active users for each room.
- Online users are displayed at the top of the chat room.
- When a user joins or leaves, the list updates automatically for everyone in the room.

Example

🟢 Online: lavanya, manish, bhaskar

## Future Enhancements
* Room creation
* Typing indicator
* Message timestamps
* User authentication

## Author

Lavanya S
