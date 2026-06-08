# Real Time Chat Application

A full-stack real-time chat application built using React, Node.js, Express.js, MongoDB, and Socket.IO.

## Features

* Real-time messaging
* Multi-room chat support
* Message persistence using MongoDB
* Dynamic room creation
* Responsive user interface
* Socket.IO integration
* Room joining functionality
* Active user display
* Typing indicator
* Real-time user presence updates
* Responsive user interface

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

##page1
room list page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9371f0ea-20f6-45d0-be5b-f3c36f6b2f5a" />


##page2
chat page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e75b89bc-68d2-4a19-9aa1-64941c242aee" />



### feature:

## Dynamic Room Creation
Users can create new chat rooms in real time.
Room details are stored in MongoDB.
Newly created rooms become instantly available for others to join.

## Active Users Feature
This chat application now supports real-time online user tracking.
- Users join a chat room using Socket.IO.
- The server tracks active users for each room.
- Online users are displayed at the top of the chat room.
- When a user joins or leaves, the list updates automatically for everyone in the room.

## typing indicator feature
- Added real-time typing indicator using Socket.IO
- Shows when a user is typing in the chat room
- Automatically hides indicator after inactivity
- Improved chat experience

## Future Improvements
- Private messaging
- Authentication and authorization
- Message reactions
- File sharing
- Notifications



## Author
Lavanya S
