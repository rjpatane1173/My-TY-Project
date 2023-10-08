const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files (HTML, CSS, etc.)
app.use(express.static(__dirname));

// Handle player connections
io.on('connection', (socket) => {
    // Generate a unique lobby code for the player
    const lobbyCode = generateLobbyCode();

    // Notify the player of their lobby code
    socket.emit('joined', lobbyCode);

    // Handle game logic, player movement, and interactions here
    // You'll need to implement the actual game logic
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function generateLobbyCode() {
    // Generate a unique lobby code (you can customize this function)
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
