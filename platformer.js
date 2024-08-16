
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gravity = 0.5;
const playerSpeed = 5;
const jumpStrength = 10;
const enemySpeed = 2;
let currentLevel = 0;
let levels = [];

// Player properties
let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    grounded: false,
    health: 3
};

// Create levels
levels.push({
    platforms: [
        { x: 0, y: 350, width: 200, height: 20 },
        { x: 250, y: 300, width: 100, height: 20 },
        { x: 400, y: 250, width: 150, height: 20 },
        { x: 600, y: 200, width: 200, height: 20 }
    ],
    items: [
        { x: 280, y: 260, width: 20, height: 20 },
        { x: 450, y: 210, width: 20, height: 20 },
        { x: 650, y: 160, width: 20, height: 20 }
    ],
    enemies: [
        { x: 300, y: 280, width: 40, height: 20, direction: 1 },
        { x: 500, y: 230, width: 40, height: 20, direction: -1 }
    ]
});

// Additional levels can be added in the same manner

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
    levels[currentLevel].platforms.forEach(platform => {
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
    levels[currentLevel].platforms.forEach(platform => {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw and move enemies
    levels[currentLevel].enemies.forEach(enemy => {
        enemy.x += enemySpeed * enemy.direction;
        if (enemy.x < 0 || enemy.x + enemy.width > canvas.width) {
            enemy.direction *= -1;
        }

        // Collision with player
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            player.health -= 1;
            if (player.health <= 0) {
                gameOver();
            }
        }

        ctx.fillStyle = '#FF0000';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Draw items and check for collection
    levels[currentLevel].items = levels[currentLevel].items.filter(item => {
        if (player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y) {
            score += 10;
            return false;
        }
        return true;
    });

    levels[currentLevel].items.forEach(item => {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });

    // Draw player
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw score and health
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Health: ${player.health}`, 10, 40);

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    alert('Game Over! Press OK to restart.');
    resetGame();
}

function resetGame() {
    player.x = 50;
    player.y = 300;
    player.health = 3;
    currentLevel = 0;
    score = 0;
    gameLoop();
}

gameLoop();
