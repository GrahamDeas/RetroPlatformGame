
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gravity = 0.5;
const playerSpeed = 5;
const jumpStrength = 10;

// Player properties
let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    grounded: false
};

// Platforms
let platforms = [
    { x: 0, y: 350, width: 200, height: 20 },
    { x: 250, y: 300, width: 100, height: 20 },
    { x: 400, y: 250, width: 150, height: 20 },
    { x: 600, y: 200, width: 200, height: 20 }
];

// Collectible items
let items = [
    { x: 280, y: 260, width: 20, height: 20 },
    { x: 450, y: 210, width: 20, height: 20 },
    { x: 650, y: 160, width: 20, height: 20 }
];

let score = 0;

// Input handling
let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player movement
    if (keys['ArrowLeft']) {
        player.velocityX = -playerSpeed;
    } else if (keys['ArrowRight']) {
        player.velocityX = playerSpeed;
    } else {
        player.velocityX = 0;
    }

    if (keys['ArrowUp'] && player.grounded) {
        player.velocityY = -jumpStrength;
        player.grounded = false;
    }

    player.velocityY += gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Platform collision
    player.grounded = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.grounded = true;
        }
    });

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw items and check for collection
    items = items.filter(item => {
        if (player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y) {
            score += 10;
            return false;
        }
        return true;
    });

    items.forEach(item => {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });

    // Draw player
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw score
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(gameLoop);
}

gameLoop();
