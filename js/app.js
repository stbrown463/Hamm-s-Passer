console.log('Tapper!');

const canvas = document.getElementById('board');
// console.log(canvas);

const ctx = canvas.getContext('2d');
// console.log(ctx);

class Rectangle {
	constructor (x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

const game = {
	animationHandle: null,
	currentLevel: 1,
	lives: 3,
	score: 0,
	numBars: 4,
	randomBar: null,
	bars: [],
	taps: [],
	patrons: [],
	patronsToDelete: [],
	beers: [],
	beersToDelete:[],
	bartender: [],
	patronRate: 1000,
	patronsThisLevel: 5,
	animToggle: true,
	makeBars () {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Rectangle (0, 100 + (i * (700 / this.numBars)), 700, 50, 'brown')
			bar.draw()
			this.bars.push(bar);
		}
	},
	makeTaps() {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Rectangle (770, 100 + (i * (700 / this.numBars)), 30, 50, 'brown')
			bar.draw();
			this.taps.push(bar);
		}
	},
	drawBoard() {
		for (let i = 0; i < this.bars.length; i++) {
			this.bars[i].draw();
			this.taps[i].draw();
		}
	},
	eraseBoard() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	},
	drawAll() {
		this.eraseBoard();
		this.drawBoard();
		bartender.draw();
		patron.draw();
		beer.draw();
	},
	updateHUD () {
		const lives = document.querySelector('#lives');
		lives.innerHTML = `Player Lives<br>${game.lives}`;
		const score = document.querySelector('#score');
		score.innerHTML = `Player Score<br>${game.score}`;
	},
	startTimer () {
		this.timer = setInterval(() => {
			patron.makePatron();

		}, this.patronRate);
	},
	stopTimer() {
		clearInterval(this.timer);
	},
	leverUp () {
		// if (this.currentLevel === 2) {

		// }
	},
	stopMakingPatrons () {
		if (game.patronsThisLevel === patron.counter) {
			this.stopTimer();
			// console.log('no more patrons');
		}
	},
	checkGameOver() {
		if (this.lives <= 0) {
			this.animToggle = false;
			// this.eraseBoard();
			const div = document.createElement('div');
			div.id = 'h1-container';
			const deathText = document.createElement('h1');
			deathText.innerText = 'YOU DIED';
			div.appendChild(deathText)
			canvas.parentNode.appendChild(div);
			const resetButton = document.createElement('button');
			resetButton.innerText = 'reset game'
			resetButton.id = 'reset'
			div.appendChild(resetButton);
			// document.body.appendChild(deathText);
			// this.eraseBoard()
		}
	},

}

game.makeBars();
game.makeTaps();


const bartender = {
	x: 740,
	y: null,
	currentBar: 0,
	width: 20,
	height: 75,
	color: 'black',
	// bartenderArray: [],
	makeBartender () {
		this.getY();
		const bartender = new Rectangle (this.x, this.y, this.width, this.height, this.color)
		bartender.draw();
		game.bartender.push(bartender);
	},
	getY () {
		this.y = game.bars[this.currentBar].y - 25;
		return this.y
	},
	setY () {
		game.bartender[0].y = this.y
	},
	draw () {
		game.bartender[0].draw();
	},
	changeBar (dir) {
		
		if (dir === "w" && this.currentBar != 0) {
			game.eraseBoard();
			this.currentBar--
			this.getY()
			this.setY()
			game.drawBoard();
			this.draw();
			beer.draw();
		}
		if (dir === "s" && this.currentBar != game.numBars - 1) {
			game.eraseBoard();
			this.currentBar++
			this.getY()
			this.setY()
			this.draw()
			game.drawBoard()
			this.draw();
			beer.draw();
			
		}
	},
	run (dir) {
		console.log("I'm running");
	},
}

const beer = {
	x: 690,
	y: null,
	currentBar: 0,
	width: 10,
	height: 25,
	color: 'blue',
	makeBeer () {
		this.y = this.getY();
		const beer = new Rectangle (this.x, this.y, this.width, this.height, this.color)	
		beer.currentBar = this.currentBar
		game.beers.push(beer);
		this.draw();
	},
	getY () {
		this.y = game.bars[bartender.currentBar].y - 25;
		this.currentBar = bartender.currentBar;
		return this.y
	},
	draw () {
		for (let i = 0; i < game.beers.length; i++) {
			game.beers[i].draw();
		}
	},
	// setTimer () {
	// 	this.timer = setInterval(() => {
	
	// 	}, 2000)
	// },
	// checkTimer () {
	// 	if (this.timer === 1) {
	// 		this.makeBeer();
	// 		clearInterval(this.timer);
	// 	}
	// },
	slide () {
		for (let i = 0; i < game.beers.length; i++) {
			game.beers[i].x -= 5;
			if (game.beers[i].x <= 0) {
				game.beers.splice(i, 1);
				game.lives--;
				return
			}
		}
	},
}

const patron = {
	x: 0,
	y: null,
	currentBar: 0,
	width: 20,
	height: 75,
	color: 'green',
	speed: 1,
	counter: 0,
	makePatron () {
		// this.currentBar();
		this.currentBar = Math.floor(Math.random() * game.numBars);
		this.y = game.bars[this.currentBar].y - 25;
		const patron = new Rectangle (this.x, this.y, this.width, this.height, this.color)	
		patron.currentBar = this.currentBar
		game.patrons.push(patron);
		this.counter++;
		this.draw();
		// console.log(this.currentBar);
	},
	draw () {
		for (let i = 0; i < game.patrons.length; i++) {
			game.patrons[i].draw();
		}
	},
	walk () {
		for (let i = 0; i < game.patrons.length; i++) {
			game.patrons[i].x += this.speed;
			if (game.patrons[i].x > bartender.x - bartender.width) {
				game.patrons.splice(i, 1);
				game.lives--;

			}
		}
	},
	checkServed () {//console.log("check");
		// for (let i = 0; i < game.beers.length; i++) {
		game.beers.forEach((beer, i) =>	{
			game.patrons.forEach((patron, j) => {
				if (patron.currentBar === beer.currentBar &&
					patron.x + patron.width > game.beers[i].x) {
					// game.beers.splice(i, 1);
					// game.patrons.splice(j, 1);  // will have to change this when there are more patrons
					game.score += 50;
					// return
					game.beersToDelete.push(i);
					game.patronsToDelete.push(j);
					// console.log(Array.from(game.beersToDelete));
					// console.log(Array.from(game.patronsToDelete));
					//build list of indexes to delete
					console.log("score");
				}
			})
		})
		// delete down here
		// get the index of the 
		// console.log(Array.from(game.beersToDelete));
		// console.log(Array.from(game.patronsToDelete));
		for (let i = 0; i < game.beersToDelete.length; i++) {
			game.beers.splice(game.beersToDelete[i], 1);
			game.beersToDelete.splice(i, 1);
		}
		for (let i = 0; i < game.patronsToDelete.length; i++) {
			game.patrons.splice(game.patronsToDelete[i], 1);
			game.patronsToDelete.splice(i, 1);
		}
	},
}

patron.makePatron();

// bartender.getY();
bartender.makeBartender();
game.startTimer();

// animation loop
function animate () {
	// beer.checkTimer();
	if (!game.animToggle) {
		game.updateHUD();
		game.stopTimer();
		return
	}
	game.stopMakingPatrons();
	patron.checkServed();
	game.updateHUD();
	patron.walk();
	beer.slide();
	game.drawAll();
	game.checkGameOver();
	window.requestAnimationFrame(animate);
}

animate();







//	Event Listeners

document.addEventListener('keypress', (e) => {
	if (["w", "s"].includes(e.key)) {
		bartender.changeBar(e.key)
	}
	if ("1" === e.key) {
		game.startTimer();
	}
	if ("2" === e.key) {
		game.stopTimer();
	}
})

document.addEventListener('keydown', (e) => {
	if (["a", "d"].includes(e.key)) {
		bartender.run(e.key)
		console.log(game.beersToDelete, 'beers to delete');
		console.log(game.patronsToDelete, 'patrons to delete');
	}
	if ("Space" === e.code) {
		// beer.setTimer();
		beer.makeBeer()
	}
})

let resetButton = document.getElementById('#reset');
console.log(resetButton);
document.addEventListener('click', (e) => {
	console.log(e.target);
	console.log(resetButton);
	if (e.target === resetButton) {
		console.log('click');
	}
})






