class Player{

	constructor(x, y){
		this.x = x;
		this.y = y;
		this.velY = 0;
		this.velX = 0;
		this.width = birdSprite.width;
		this.height = birdSprite.height;
		this.fallRotation = -PI / 6;
		this.score = 0;
		this.fitness = 0;
		this.gen = 0;
		this.brain = new Brain(4);
		this.isDead = false;
		this.fitness = 0;
	}

	addScore() {
		this.score += 1;
	}

    show() {
    	push();
    	translate(this.x, this.y);
    	// print(this.velY);
    	if (this.velY < 0) {
	      this.fallRotation = -PI / 6;
	    } else {
	      this.fallRotation = map(max(this.velY, 3), 3, 10, -PI / 6, PI / 2);
	      
	    }
	    rotate(this.fallRotation);

		image(birdSprite, 0, 0);

		// fill(0, 0, 0);
		// ellipseMode(CENTER);
		// ellipse(0, 0, this.width, this.height);
		pop();

	}

	update() {
		this.x += this.velX;
		this.velY += gravity
		this.y += this.velY;
	}

	checkCollisions() {
		if (pipes.colided(this)) {
			return true;
		}
		if (ground.colided(this)) {
			return true;
		}
		if (this.y < 0) {
			return true;
		}
	}

	flap() {
		this.velY = max(-5, this.velY - 5);
	}

	look(nextPipe) {
		this.vision = [];
		this.vision[0] = map(this.velY, -25, 25, -1, -1);
		let distance = nextPipe.bottomPipe.x - this.x;
		// print(distance);
		this.vision[1] = map(distance, 0, canvas.width - this.x, 1, 0);
		this.vision[2] = map(max(0, nextPipe.bottomPipe.topY - this.y), 0, 700, 0, 1);
		this.vision[3] = map(max(0, this.y - nextPipe.topPipe.bottomY), 0, 700, 0, 1);

	}

	think() {
		let decision = this.brain.feedforward(this.vision);
		// print(decision);
		if (decision > 0.5) {
			this.flap();
		}
	}
}