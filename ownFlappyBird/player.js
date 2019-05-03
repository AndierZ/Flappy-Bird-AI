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
	}

	addScore() {
		this.score += 1;
	}

    show() {
    	push();
    	translate(this.x, this.y);
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
	}

	flap() {
		this.velY = max(-5, this.velY - 5);
	}
}