var panSpeed = 2;
var gravity = 0.3;
// var player;
var population;
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
	// player = new Player(100, canvas.height / 2); 
	population = new Population(500);
	pipes = new PipePair();
	pipes.setup(canvas.height / 2);
    ground = new Ground();
}

function draw() {

	if (!gameOver) {
		image(backgroundSprite, 0, 0, canvas.width, canvas.height);
		// let time = millis();
		pipes.update();
		// print(2, millis() - time);
		// time = millis();
		pipes.show();
		// print(3, millis() - time);
		// time = millis();
		pipes = pipes.checkOffScreen();
		// print(4, millis() - time);
		// time = millis();
		population.evolve(pipes);
		// print(5, millis() - time);
		// time = millis();
		ground.update();
		// print(6, millis() - time);
		// time = millis();
		ground.show();

		gameOver = population.extinct();

		textSize(16);
		text("ScoreStreak: " + this.population.bestScore, canvas.width/2 + 250, canvas.height/2 - 150);
		text("Dead: " + this.population.deadBirds, canvas.width/2 + 250, canvas.height/2 - 130);
		text("PopulationSize: " + this.population.players.length, canvas.width/2 + 250, canvas.height/2 - 110);
		text("BestConfig: " + this.population.bestPlayer.brain.config, canvas.width/2 + 250, canvas.height/2 - 90);
		fill(0);
	} else {
		textSize(32);
		text("Score: " + this.population.bestScore, canvas.width/2 - 50, canvas.height/2);
		fill(0, 102, 153);
	}
}

function keyPressed() {
	switch(key) {
		case ' ':
			// player.flap();
			print('space');
			break;
		case 'B':
			print('show best');
			population.onlyShowBest(true);
			break;
		case 'A':
			print('show all');
			population.onlyShowBest(false);
			break;
	}
}