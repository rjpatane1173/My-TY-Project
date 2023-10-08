const socket = io();

// Handle player joining the game using lobby code
socket.on('joined', (lobbyCode) => {
    // Handle joining the game lobby
    // You can redirect the player to the game page or set up the game lobby UI
});

// Handle game updates and interactions
// Implement your game logic here

// Add event listeners for the left and right buttons
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

leftButton.addEventListener("click", () => {
    // Move the player's car left
    // Implement your car movement logic here
});

rightButton.addEventListener("click", () => {
    // Move the player's car right
    // Implement your car movement logic here
});


// Define game variables
const roadWidth = 400; // Width of the road
const gapWidth = 100; // Width of the gap for the player to pass through
const carWidth = 50; // Width of the player's car

// Initial position of the player's car
let carX = (roadWidth - carWidth) / 2;


// Inside your client.js file
const objects = [];

// Function to create a random object
function createObject() {
    const objectWidth = 40; // Width of the objects
    const objectX = Math.random() * (roadWidth - objectWidth);
    const objectY = -50; // Start objects above the screen
    objects.push({ x: objectX, y: objectY, width: objectWidth });
}

// Function to update object positions
function updateObjects() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        object.y += 5; // Adjust speed as needed
    }
}

// Call createObject periodically to generate objects
setInterval(createObject, 2000); // Generate objects every 2 seconds


// Inside your client.js file
function checkCollisions() {
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        // Calculate the center of the player's car
        const carCenterX = carX + carWidth / 2;

        // Check if the car is within the gap
        if (
            carCenterX >= object.x &&
            carCenterX <= object.x + gapWidth
        ) {
            // Car is within the gap; no collision
        } else if (
            carX + carWidth >= object.x &&
            carX <= object.x + object.width
        ) {
            // Collision detected; implement game over logic here
            gameOver();
        }
    }
}

function gameOver() {
    // Implement game over logic, e.g., display a game over message and stop the game loop
    // You can also offer the option to restart the game
}


// Inside your client.js file
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player's car position (implement car movement logic)

    // Update and draw objects
    updateObjects();
    drawObjects();

    // Check for collisions
    checkCollisions();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();


const socket = io(); // Connect to the server

function drawObjects() {
    // Set the car color to white
    ctx.fillStyle = "white";

    // Draw the player's car as a rectangle (you can customize this)
    ctx.fillRect(carX, canvas.height - 100, carWidth, 50);

    // Set the object (obstacle) color to black
    ctx.fillStyle = "black";

    // Draw the objects as rectangles (you can customize this)
    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        ctx.fillRect(object.x, object.y, object.width, object.width);
    }
}


function changeBackgroundColor() {
    // Array of possible background colors
    const backgroundColors = ["lightblue", "lightgreen", "lightpink"];

    // Randomly select a color from the array
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    // Set the canvas background color
    canvas.style.backgroundColor = randomColor;
}

// Call changeBackgroundColor initially to set the initial background color
changeBackgroundColor();

// Change the background color every 45 seconds
setInterval(changeBackgroundColor, 45000); // 45,000 milliseconds = 45 seconds


// Add this code to your client.js file

// Get the modal element
const modal = document.getElementById("myModal");

// Get the close button inside the modal
const closeButton = document.querySelector(".close");

// Get the host and join buttons
const hostButton = document.getElementById("hostRoom");
const joinButton = document.getElementById("joinRoom");

// When the page loads, show the modal
window.onload = function () {
    modal.style.display = "block";
};

// When the user clicks the close button, hide the modal
closeButton.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks outside the modal, hide it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// When the user clicks the host button
hostButton.onclick = function () {
    const playerName = document.getElementById("playerName").value;
    // You can send the playerName to your server for hosting a room
    // Implement the logic for hosting the room here
    console.log(`Player ${playerName} is hosting a room.`);
};

// When the user clicks the join button
joinButton.onclick = function () {
    const playerName = document.getElementById("playerName").value;
    // You can send the playerName to your server for joining a room
    // Implement the logic for joining a room here
    console.log(`Player ${playerName} is joining a room.`);
    modal.style.display = "none"; // Close the modal after joining
};
