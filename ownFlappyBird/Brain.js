class Brain {
	constructor(hidden_nodes){
		this.layers = 3; // 4-x-1 structure
		this.config = [4, hidden_nodes, 1];
		this.weights = [];
		this.bias = [];
		this.buildNetwork();
	}

	buildNetwork(){
		for (let i=0; i<this.layers-1; i++) {
			this.weights[i] = new Matrix(this.config[i+1], this.config[i]);
			this.weights[i].randomize();
			this.bias[i] = new Matrix(this.config[i+1], 1);
			this.bias[i].randomize();
		}

		this.toGene();
	}

	sigmoid(x) {
	  var y = 1 / (1 + pow(Math.E, -x));
	  return y;
	}

	feedforward(inputs){
		var inputs = Matrix.fromArray(inputs);
		for (let i=0; i<this.layers-1; i++) {
			// console.table(inputs.matrix);
			inputs = Matrix.dot(this.weights[i], inputs);
			// console.table(inputs.matrix);
			if (this.bias[i].matrix == null) {
				// print(i, this.bias[i].matrix)	
			}
			
			inputs.add(this.bias[i]);
			// console.table(inputs.matrix);
			inputs = Matrix.map(inputs, this.sigmoid);
			// console.table(inputs.matrix);
		}

		return inputs.matrix[0][0];
	}

	crossover(b){
		let baby_gene = [];
		let baby = null;
		if (b.config[1] == this.config[1]) {
			for(let i=0; i<this.gene.length; i++) {
				if (random(1) < 0.5) {
					baby_gene.push(this.gene[i]);	
				} else {
					baby_gene.push(b.gene[i]);
				}
			}

			baby = new Brain(this.config[1]);

			baby.gene = baby_gene;
			baby.mutateWeights(0.01);
			baby.mutateNodes(0.01);
			baby.fromGene();

		} else {
			baby = this.clone();
		}
		return baby;
	}

	clone() {
		let c = new Brain(this.config[1]);
		c.gene = this.gene;
		c.mutateWeights(0.05);
		c.mutateNodes(0.1);
		c.fromGene();
		return c;
	}

	toGene(){
		this.gene = [];
		for(let i=0; i<this.layers-1; i++) {
			for(let j=0; j<this.weights[i].rows; j++) {
				for(let k=0; k<this.weights[i].cols; k++) {
					this.gene.push(this.weights[i].matrix[j][k])	
				}
			}
		}

		for(let i=0; i<this.layers-1; i++) {
			for(let j=0; j<this.bias[i].rows; j++) {
				for(let k=0; k<this.bias[i].cols; k++) {
					this.gene.push(this.bias[i].matrix[j][k])	
				}
			}
		}
	}

	fromGene(){
		// rewrite using from and to array
		let x = 0;
		for(let i=0; i<this.layers-1; i++) {
			for(let j=0; j<this.weights[i].rows; j++) {
				for(let k=0; k<this.weights[i].cols; k++) {
					this.weights[i].matrix[j][k] = this.gene[x];
					x += 1;
				}
			}
		}

		for(let i=0; i<this.layers-1; i++) {
			for(let j=0; j<this.bias[i].rows; j++) {
				for(let k=0; k<this.bias[i].cols; k++) {
					this.bias[i].matrix[j][k] = this.gene[x];
					x += 1;
				}
			}
		}
	}

	mutateWeights(mutate_rate){
		let mutated = false;
		for (let i=0; i<this.gene.length; i++) {
			if (random(1) < mutate_rate) {
				this.gene[i] = random(-1, 1);
				mutated = true;
			}
		}

		if (mutated) {
			this.fromGene();
		}

		return mutated;
	}

	mutateNodes(mutate_rate) {
		
		let mutated = false;
		let r = random(1);
		if (r < mutate_rate/10) {
			this.buildNetwork();
			return 1;
		}
		else if (r < mutate_rate) {
			if (random(1) < 0.5) {
				this.config[1] += 1;
				// update two matrices
				// add a row to this.weights[0]
				// add a col to this.weights[1]
				let row = new Matrix(1, this.weights[0].cols);
				row.randomize();
				this.weights[0].matrix.push(row.matrix[0]);
				this.weights[0].rows += 1;

				for(let j=0; j<this.weights[1].rows; j++) {
					this.weights[1].matrix[j].push(random(1))
				}
				this.weights[1].cols += 1;

				this.bias[0].matrix.push([random(1)]);
				this.bias[0].rows += 1;
				
				return 2;

			} else {
				if (this.config[1] > 1) {
					this.config[1] -= 1;
					// remove a row in this.weights[0]
					// remove a col in this.weights[1]
					this.weights[0].matrix.splice(this.weights[0].matrix.length-1);
					this.weights[0].rows -= 1;

					for(let j=0; j<this.weights[1].rows; j++) {
						this.weights[1].matrix[j].splice(this.weights[1].cols-1);
					}
					this.weights[1].cols -= 1;

					this.bias[0].matrix.splice(this.bias[0].matrix.length-1);
					this.bias[0].rows -= 1;
					return 3;
				}
				return 4;
			}
		}
	}
}