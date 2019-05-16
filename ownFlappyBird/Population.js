class Population{

	constructor(population_size){
		this.population_size = population_size;
		this.players = [];
		this.bestFitness = 0;
		this.epoch = 0;
		this.bestPlayer = null;
		this.showBest = false;
		this.bestScore = 0;
		this.deadBirds = 0;
		this.reproduceCycle = 100;
		for(let i=0; i<this.population_size; i++) {
			this.players.push(new Player(100, canvas.height / 2));
		}
	}

	evolve(pipes){

		let nextGeneration = [];
		this.epoch ++;

		for(let p of this.players) {

			p.look(pipes);
			p.think();
			// todo paint dead birds differently?
			p.update();
			if (this.showBest) {
				// print('showing best', this.bestPlayer);
				if (p == this.bestPlayer) {
					p.show();
				}
			} else {
				p.show();
			}

			p.isDead = p.checkCollisions();
			if (p.checkCollisions()) {
				p.isDead = true;
				this.deadBirds ++;
			} else {
				if(pipes.playerPassed(p)){
					p.addScore();
					this.bestScore = p.score;
				}
				p.fitness = this.epoch;
				if (p.fitness > this.bestFitness) {
					this.bestPlayer = p;
					this.bestFitness = p.fitness;
				}
				nextGeneration.push(p);
			}
		}

		this.players = nextGeneration;	
		if (this.players.length == 0) {
			for(let i=1; i<10; i++) {
				print('cloning!');
				var newBrain = this.bestPlayer.brain.crossover(this.bestPlayer.brain);
				var baby = new Player(100, canvas.height / 2);
				baby.brain = newBrain;
				this.players.push(baby);
			}
		}

		let x = this.epoch % this.reproduceCycle
		// print(this.epoch % this.reproduceCycle);
		if (x == 0) {
			this.reproduce();	
		}
	}

	extinct() {
		return this.players.length == 0;
	}

	reproduce() {

		if (this.players.length == 0) {
			return;
		}

		while(this.players.length < this.population_size) {
			// all birds alive have same fitness, which is the score
			let p1 = this.pickOne();
			let p2 = this.pickOne();

			let newBrain = p1.brain.crossover(p2.brain);
			let baby = new Player(100, canvas.height / 2);
			baby.brain = newBrain;

			this.players.push(baby);
		}
	}

	onlyShowBest(val) {
		this.showBest = val;
	}

	pickOne() {
		let maxFitness = 0;
		for (let i=0; i<this.players.length; i++) {
			maxFitness += this.players[i].fitness;
		}
		let mark = random(maxFitness);
		let index = 0;

		for (let i=0; i<this.players.length; i++) {
			mark -= this.players[i].fitness;
			if (mark <= 0) {
				break;
			}
			index++;
		}

		return this.players[index];
	}
}