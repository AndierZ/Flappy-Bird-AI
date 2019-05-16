class PipePair {

 	constructor() {
 		this.gap = 100;
 		this.minDistFromEdge = this.gap + 50;
 		this.maxPipeDifference = 300;
 		this.spacing = 250;
 	}

 	setup(previousCenter) {
		// offset
 		// random between previous center +- maxPipeDifference, capped at minDistFromEdge at bottom, and canvas.height - minDistFromEdge at top
 		this.center = random(max(previousCenter - this.maxPipeDifference, this.minDistFromEdge), min(previousCenter + this.minDistFromEdge, canvas.height - this.minDistFromEdge));

 		this.topHeight = canvas.height - this.center - this.gap/2;
 		this.bottomHeight = this.center - this.gap/2;

		this.bottomPipe = new Pipe(false, this.bottomHeight);
		this.topPipe = new Pipe(true, this.topHeight);
 		this.topHeight = this.center - this.gap/2;
 		this.bottomHeight = this.center + this.gap/2;
 		this.passed = false;
 		this.next = null;
 	}

	show() {
		this.bottomPipe.show();
		this.topPipe.show();
		if (this.next) {
			this.next.show();
		}
	}

	update() {
		this.bottomPipe.update();
		this.topPipe.update();
		if (!this.next && canvas.width - this.topPipe.x > this.spacing) {
			if (pipesPool) {
				this.next = pipesPool;
				pipesPool = null;
			} else {
				this.next = new PipePair();
			}
			this.next.setup(this.center);
			
		}
		if (this.next) {
			this.next.update();
		}
	}

	offScreen() {
		return this.bottomPipe.x + this.bottomPipe.width < 0;
	}

	checkOffScreen() {
		if (this.offScreen()) {
			pipesPool = this;
			if (this.next) {
				return this.next.checkOffScreen();
			}
			return null;
		} else {
			return this;
		}
	}

	colided(p) {
		var ret = this.bottomPipe.colided(p) || this.topPipe.colided(p);
		if (!ret && this.next) {
			return this.next.colided(p);
		}
		return ret;
	}

	playerPassed(p) {
		if (!this.passed && p.x > this.bottomPipe.x + this.bottomPipe.width) {
			this.passed = true;
			return true;
		}
		if (this.next) {
			return this.next.playerPassed(p);
		}
		return false;
	}

	nextPipes(p) {
		if (this.playerPassed(p)) {
			return this.next.nextPipes();
		}
		return this;
	}
}