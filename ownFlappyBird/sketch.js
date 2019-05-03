var panSpeed = 2;
var gravity = 0.3;
var player;
var pipes;
var ground;
var gameOver = false;
var pipesPool;

function preload() {
	birdSprite = loadImage("http://localhost:5000/images/fatBird.png");
	topPipeSprite = loadImage("http://localhost:5000/images/full pipe top.png");
	bottomPipeSprite = loadImage("http://localhost:5000/images/full pipe bottom.png");
    backgroundSprite = loadImage("http://localhost:5000/images/background.png");
    groundSprite = loadImage("http://localhost:5000/images/groundPiece.png");
}

function setup() {
	window.canvas = createCanvas(800, 400);
	player = new Player(100, canvas.height / 2); 
	pipes = new PipePair();
	pipes.setup(canvas.height / 2);
    ground = new Ground();
}

function draw() {

	if (!gameOver) {
		image(backgroundSprite, 0, 0, canvas.width, canvas.height);
		pipes.update();
		pipes.show();
		pipes = pipes.checkOffScreen();
		player.update();
		player.show();

		ground.update();
		ground.show();

		if(pipes.playerPassed(player)){
			player.addScore();
		}

		gameOver = player.checkCollisions();
	} else {
		textSize(32);
		text("Score: " + this.player.score, canvas.width/2 - 50, canvas.height/2);
		fill(0, 102, 153);
	}
}

function keyPressed() {
	switch(key) {
		case ' ':
			player.flap();
			break;
	}
}