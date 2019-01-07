console.log('Tapper!');

const canvas = document.getElementById('board');
// console.log(canvas);

const ctx = canvas.getContext('2d');
// console.log(ctx);


// make one bar
// function makeBar (x, y, width, height, color) {
// 	ctx.beginPath();
// 	ctx.rect(x, y, width, height);
// 	ctx.fillStyle = color;
// 	ctx.fill();
// }

// makeBar(0, 100, 600, 50, 'brown');

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
	lives: 3,
	score: 0,
	numBars: 4,
	randomBar: null,
	bars: [],
	taps: [],
	patrons: [],
	beers: [],
	bartender: [],
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

		}, 2000);
	},
	// checkServed () {
	// 	for (let i = 0; i < beer.beers.length; i++) {
	// 		patron.patrons.forEach((patron, j) => {
	// 			if (patron.currentBar === beer.beers[i].currentBar &&
	// 				patron.x + patron.width > beer.beers[i].x) {
	// 				beer.beers.splice(i, 1);
	// 				patron.patrons.splice(j, 1);  // will have to change this when there are more patrons
	// 				game.score += 50;

	// 				//build list of indexes to delete
	// 			}
	// 		})
	// 	}
	// },
	// randomBar () {
	// 	this.currentBar = Math.floor(Math.random() * 3);
	// 	this.y = game.bars[this.currentBar].y - 25;
	// }
	// createPatron () {
	// 	this.randomBar();
	// 	const Patron = new Patron (0,  )
	// x: 0,
	// y: null,
	// currentBar: 0,
	// width: 20,
	// height: 75,
	// color: 'green',
	// patrons: [],
	// }
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
		// this.bartenderArray[0].draw();
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
		// beer.draw();
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
	slide () {
		for (let i = 0; i < game.beers.length; i++) {
			game.beers[i].x -= 5;
			if (game.beers[i].x <= 0) {
				game.beers.splice(i, 1);
				game.lives--;
			}
		}
	},
}

// class Patron extends Rectangle  {
// 	constructor (x, y, width, height, color) {
// 		super(x, y, width, height, color);
// 		this.currentBar = currentBar
// 	}
// 	makePatron () {
// 		this.currentBar();
// 		const patron = new Patron (this.x, this.y, this.width, this.height, this.color)	
// 		// beer.draw();
// 		patron.currentBar = this.currentBar
// 		this.patrons.push(patron);
// 		this.draw();
// 	}
// 	currentBar () {
// 		// random bar height
// 		this.currentBar = Math.floor(Math.random() * 3);
// 		this.y = game.bars[this.currentBar].y - 25;
// 	}
// 	draw () {
// 		for (let i = 0; i < this.patrons.length; i++) {
// 			this.patrons[i].draw();
// 		}
// 	}
// 	walk () {
// 		for (let i = 0; i < this.patrons.length; i++) {
// 			this.patrons[i].x += 1;
// 			if (this.patrons[i].x > bartender.x - bartender.width) {
// 				this.patrons.splice(i, 1);
// 				game.lives--;
// 			}
// 		}
// 	}
// 	checkServed () {
// 		for (let i = 0; i < beer.beers.length; i++) {
// 			this.patrons.forEach((patron, j) => {
// 				if (patron.currentBar === beer.beers[i].currentBar &&
// 					patron.x + patron.width > beer.beers[i].x) {
// 					beer.beers.splice(i, 1);
// 					this.patrons.splice(j, 1);  // will have to change this when there are more patrons
// 					game.score += 50;

// 					//build list of indexes to delete
// 				}
// 			})
// 		}
// 	}
// }


const patron = {
	x: 0,
	y: null,
	currentBar: 0,
	width: 20,
	height: 75,
	color: 'green',
	patrons: [],  // should live in game
	makePatron () {
		// this.currentBar();
		this.currentBar = Math.floor(Math.random() * game.numBars);
		this.y = game.bars[this.currentBar].y - 25;
		const patron = new Rectangle (this.x, this.y, this.width, this.height, this.color)	
		patron.currentBar = this.currentBar
		game.patrons.push(patron);
		this.draw();
		// console.log(this.currentBar);
	},
	// currentBar () {
	// 	// random bar height
	// 	this.currentBar = Math.floor(Math.random() * 3);
	// 	this.y = game.bars[this.currentBar].y - 25;
	// },
	draw () {
		for (let i = 0; i < game.patrons.length; i++) {
			game.patrons[i].draw();
		}
	},
	walk () {
		for (let i = 0; i < game.patrons.length; i++) {
			game.patrons[i].x += 1;
			if (game.patrons[i].x > bartender.x - bartender.width) {
				game.patrons.splice(i, 1);
				game.lives--;
			}
		}
	},
	checkServed () {
		// for (let i = 0; i < game.beers.length; i++) {
		game.beers.forEach((beer, i) =>	{
			game.patrons.forEach((patron, j) => {
				if (patron.currentBar === beer.currentBar &&
					patron.x + patron.width > game.beers[i].x) {
					game.beers.splice(i, 1);
					game.patrons.splice(j, 1);  // will have to change this when there are more patrons
					game.score += 50;

					//build list of indexes to delete
				}
			})
		})
		
		// for (let i = 0; i < game.patrons.length; i++) {
		// 	for (let j = 0; j < game.beers.length; j++) {
		// 		if (game.patrons[i].currentBar === game.beers[j].currentBar &&
		// 			game.patrons[i].x + game.patrons.width > game.beers[j].x) {
		// 			game.beers.splice(i, 1);
		// 			game.patrons.splice(j, 1);  // will have to change this when there are more patrons
		// 			game.score += 50;
		// 		}
		// 	}
		// }
	},
}

patron.makePatron();

// bartender.getY();
bartender.makeBartender();
game.startTimer();

// animation loop
function animate () {
	patron.checkServed();
	game.updateHUD();
	patron.walk();
	beer.slide();
	game.drawAll();
	window.requestAnimationFrame(animate);
}

animate();







//	Event Listeners

document.addEventListener('keypress', (e) => {
	if (["w", "s"].includes(e.key)) {
		bartender.changeBar(e.key)
	}
})

document.addEventListener('keydown', (e) => {
	if (["a", "d"].includes(e.key)) {
		bartender.run(e.key)
	}
	if ("Space" === e.code) {
		// bartender.pourBeer();
		beer.makeBeer()
	}
})






