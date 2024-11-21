// Game configuration
var config = {
    type: Phaser.AUTO,  // Automatically chooses WebGL or Canvas
    width: 800,  // Fixed width
    height: 600, // Fixed height
    physics: {
        default: 'arcade',  // Arcade physics for simple gravity and collision
        arcade: {
            gravity: { y: 300 },  // Gravity pulls objects down
            debug: false  // Turn this on to see physics boundaries
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Start the game
var game = new Phaser.Game(config);

function preload() {
    // Load images for the game
    this.load.image('ground', 'assets/grass.png');
    this.load.image('player', 'assets/alienGreen_walk1.png');
    this.load.image('box', 'assets/boxCoin_disabled.png');
}

var player;
var platforms;

function create() {
    // Add platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'ground'); // Centered ground
    platforms.create(600, 400, 'box'); // Floating box

    // Add the player
    player = this.physics.add.sprite(100, 450, 'player'); // Starting position
    player.setBounce(0.2);  // Adds a slight bounce
    player.setCollideWorldBounds(true); // Keeps player inside the game area

    // Enable collision between the player and platforms
    this.physics.add.collider(player, platforms);

    // Add cursor keys for movement
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Reset player velocity to stop movement
    player.setVelocityX(0);

    // Left and right movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);  // Move left
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);  // Move right
    }

    // Jump if the player is touching the ground
    if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-400);  // Jump
    }
}

