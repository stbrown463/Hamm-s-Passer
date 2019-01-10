console.log("Hamm's Passer!");

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// practice canvas stuff

// var can = new Image();
// can.src = 'images/Hamms-Can-2016.jpg'
// console.log(can);
// // ctx.drawImage(can, 100, 100, 300, 571)
// can.addEventListener('load', function () {
// 	drawImage(can);
// })

// function drawCan () {
// 	var can = new Image();
// 	can.src = 'images/Hamms-Can-2016.jpg'
// 	can.onload = function() {
// 		ctx.drawImage(can, 0, 0);
// 	};
// }

class Rectangle {
	constructor (x, y, width, height, color, type, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.type = type;
		this.img = img;
	}
	draw () {
		if (this.type === 'rect') {
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		} 
		if (this.type === 'beer') {
			//trying to make can work
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
		if (this.type === 'fridge') {
			// notes on slicing img 
			// ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			// sx = 150, swidth =150, sy = 0, sheight = 300 roughly
			ctx.drawImage(this.img, 160, 10, 135, 280, this.x, this.y, this.width, this.height) 
		}
		if (this.type === 'bartender') {
			ctx.drawImage(this.img, 350, 60, 300, 975, this.x, this.y, this.width, this.height);
		}
		if (this.type === 'punk') {
			ctx.drawImage(this.img, 250, 70, 400, 1100, this.x, this.y, this.width, this.height);
		}
		if (this.type === 'woman') {
			ctx.drawImage(this.img, 50, 50, 400, 550, this.x, this.y, this.width, this.height);
		}
		if (this.type === 'bman') {
			ctx.drawImage(this.img, 500, 0, 450, 1456, this.x, this.y, this.width, this.height);
		}
		if (this.type === 'bar') {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	}
}

const game = {
	currentPlayer: 1,
	hadTurnP1: false,
	hadTurnP2: false,
	lives: 3,
	score1: 0,
	score2: 0,
	numBars: 4,
	bars: [],
	taps: [],
	patrons: [],
	patronsToDelete: [],
	beers: [],
	beersToDelete:[],
	bartender: [],
	patronRate: 2000,
	patronsThisLevel: 5,
	patronCounter: 0,
	animToggle: true,
	running: false,
	init () {
		const startScreen = document.getElementById('start-screen')
		startScreen.parentNode.removeChild(startScreen);
		this.running = true;
		this.makeBars();
		this.makeTaps();
		patron.makePatron();
		bartender.makeBartender();
		this.startTimer();
		animate();
	},
	makeBars () {
		for (let i = 0; i < this.numBars; i++) {
			const img = new Image();
			img.src = 'images/Woodgrain.jpg'	
			
			const bar = new Rectangle (0, 100 + (i * (700 / this.numBars)), 700, 50, 'brown', 'bar', img) // change type back to rect for rect
			bar.draw()
			this.bars.push(bar);
		}
	},
	makeTaps() {
		for (let i = 0; i < this.numBars; i++) {
			const img = new Image();
			img.src = 'images/fridges.jpg'
			const fridge = new Rectangle (770, 60 + (i * (700 / this.numBars)), 28, 90, 'brown', 'fridge', img)  //changed height from 50. //changed y from + 100

			fridge.draw();
			this.taps.push(fridge);

			// makes taps as colored rectangles instead of img incase img fails

			// const tap = new Rectangle (770, 100 + (i * (700 / this.numBars)), 28, 50, 'brown', 'rect', null)  //changed 28 from 30
			// tap.draw();
			// this.taps.push(tap);
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
		lives.innerHTML = `Player Lives<br>${this.lives}`;
		const p1Score = document.querySelector('#p1-score');
		p1Score.innerHTML = `Player 1 Score<br>${this.score1}`;
		const p2Score = document.querySelector('#p2-score');
		p2Score.innerHTML = `Player 2 Score<br>${this.score2}`;
		const currentPlayer = document.querySelector('#current-player');
		currentPlayer.innerHTML = `Current Player<br>${this.currentPlayer}`;
	},
	startTimer () {
		this.timer = setInterval(() => {
			patron.makePatron();

		}, this.patronRate);
	},
	stopTimer() {
		clearInterval(this.timer);
	},
	stopMakingPatrons () {
		if (game.patronsThisLevel === game.patronCounter) {
			this.stopTimer();
			return true
		}
	},
	checkGameOver() {
		if (this.lives <= 0) {
			this.changePlayer()
			this.animToggle = false;
			this.stopTimer();
			
			const div = document.createElement('div');
			div.id = 'message-container';
			canvas.parentNode.appendChild(div);

			const deathText = document.createElement('h1');
			deathText.id = 'death-text'
			deathText.innerText = 'Round Over';
			div.appendChild(deathText)

			if (this.hadTurnP1 && this.hadTurnP2) {
				const winnerMessage = document.createElement('h1');
				winnerMessage.id = 'winner-message'
				if (this.score1 > this.score2 ){
					winnerMessage.innerText = 'Player One Wins!';
				} else if (this.score1 < this.score2) {
					winnerMessage.innerText = 'Player Two Wins!';
				} else if (this.score1 === this.score2) {
					winnerMessage.innerText = 'Tie Game!'
				}
				div.appendChild(winnerMessage)
			}
			const buttonBox = document.createElement('div')
			buttonBox.id = 'button-box'
			div.appendChild(buttonBox)
			
			const changePlayer = document.createElement('button');
			changePlayer.innerText = 'Change Player';
			changePlayer.id = 'change-player';
			buttonBox.appendChild(changePlayer);

			const resetButton = document.createElement('button');
			resetButton.innerText = 'Reset Game'
			resetButton.id = 'reset'
			buttonBox.appendChild(resetButton);			
		}
	},
	reset () {
		const messageContainer = document.getElementById('message-container');
		canvas.parentNode.removeChild(messageContainer);
		this.eraseBoard();

		//reset values
		this.currentLevel = 1;
		this.lives = 3;
		this.numBars = 4;
		this.bars = [];
		this.taps = [];
		this.patrons = [];
		this.beers = [];
		this.bartender = [];
		this.patronRate = 2000;
		this.patronsThisLevel = 5;		
		patron.speed = 1;
		beer.speed = 5;
		bartender.currentBar = 0;

		// rebuild game to match reset values
		this.makeBars()
		this.makeTaps()
		patron.makePatron();
		bartender.makeBartender();

		// enable movement
		this.startTimer();
		this.animToggle = true;
		animate();
	},
	zeroScores () {
		this.score1 = 0;
		this.score2 = 0;
		this.currentPlayer = 1;
	},
	changePlayer () {
		if (this.currentPlayer === 1) {
			this.hadTurnP1 = true;
			this.hadTurnP2 = false;
			this.currentPlayer = 2;
		} else if (this.currentPlayer === 2) {
			this.hadTurnP2 = true
			this.currentPlayer = 1;
		}
	},
	increaseDifficulty() {
		if (this.patronCounter % 10 === 0) {
			
			patron.speed += 0.2;
			beer.speed += 0.1;
			console.log('Difficulty increase!');
			console.log(patron.speed, 'current patron speed');
			console.log(beer.speed, 'current beer speed');;
			if (this.patronRate >= 1000) {
				this.stopTimer()
				this.patronRate -= 200;
				this.startTimer()
				console.log();
				console.log(this.patronRate, 'current patron rate');
			}
		}
	}
}



const bartender = {
	x: 740,
	y: null,
	currentBar: 0,
	width: 25,  //changed from 20
	height: 90, //changed from 75
	color: 'black',
	makeBartender () {
		this.getY();
		const img = new Image();	
		img.src = 'images/waiter.png'	
		const bartender = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'bartender', img)
		bartender.draw();
		game.bartender.push(bartender);

		// makes colored rectangles instead of bartender

		// this.getY();
		// const bartender = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'rect', null)
		// bartender.draw();
		// game.bartender.push(bartender);
	},
	getY () {
		this.y = game.bars[this.currentBar].y - 40;  //changed from -25
		return this.y
	},
	moveBartenderV () {
		game.eraseBoard();
		game.bartender[0].y = game.bars[this.currentBar].y - 40
		game.drawBoard();
		this.draw();
		beer.draw();
	},
	draw () {
		game.bartender[0].draw();
	},
	changeBar (dir) {		
		if (dir === "w") {
			if (this.currentBar != 0) {
				this.currentBar--
			}
			else {
				this.currentBar = game.bars.length - 1;
			}
		}
		if (dir === "s") {
			if (this.currentBar != game.bars.length - 1) {
				this.currentBar++	
			}
			else {
				this.currentBar = 0;		
			}
		}
		this.moveBartenderV()

	},
	run (dir) {
		console.log("I'm running");
		// feature to be added later
	},
}


const beer = {
	x: 690,
	y: null,
	currentBar: 0,
	width: 15,
	height: 25,
	color: 'blue',
	speed: 5,
	makeBeer () {
		this.y = this.getY();
		const img = new Image();
		img.src = 'images/Hamms-Can-2016.jpg'	
		const can = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'beer', img)
		can.currentBar = this.currentBar
		game.beers.push(can);

		this.draw();

		// rectangle that works

		// this.y = this.getY();
		// const beer = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'rect', null)	
		// beer.currentBar = this.currentBar
		// game.beers.push(beer);
		// this.draw();
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
			game.beers[i].x -= this.speed;
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
	width: 25,    //25 , 90. changed from 20, 75
	height: 90,
	color: 'green',
	speed: 1,
	counter: 0,
	makePatron () {
		// did this branching work ???
		const randIdx = Math.floor(Math.random() * 3);
		// console.log(randIdx);
		const img = new Image()
		this.currentBar = Math.floor(Math.random() * game.numBars);
		this.y = game.bars[this.currentBar].y - 40;  //40. changed from 25
		if (randIdx === 0) {
			img.src = 'images/punk-dude-transparent.png'
			const patron = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'punk', img);
			patron.currentBar = this.currentBar
			game.patrons.push(patron);
		}
		if (randIdx === 1) {
			img.src = 'images/woman.png'
			const patron = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'woman', img);
			patron.currentBar = this.currentBar
			game.patrons.push(patron);
		}
		if (randIdx === 2) {
			img.src = 'images/business-man.png'
			const patron = new Rectangle (this.x, this.y, this.width, this.height, this.color, 'bman', img);
			patron.currentBar = this.currentBar
			game.patrons.push(patron);
		}
		// return img		
		game.patronCounter++;
		game.increaseDifficulty();
		this.draw();
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
	checkServed () {
		game.beers.forEach((beer, i) =>	{
			game.patrons.forEach((patron, j) => {
				if (patron.currentBar === beer.currentBar &&
					patron.x + patron.width > game.beers[i].x) {	
					if (game.currentPlayer === 1) {
						game.score1 += 50;
					}
					if (game.currentPlayer === 2) {
						game.score2 += 50;
					}
					
					game.beersToDelete.push(i);
					game.patronsToDelete.push(j);
				}
			})
		})
		// delete collision arrays down here
	
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


// animation loop
function animate () {
	if (!game.animToggle) {
		game.updateHUD();
		game.stopTimer();
		return
	}
	patron.checkServed();
	game.updateHUD();
	patron.walk();
	beer.slide();
	game.drawAll();
	game.checkGameOver();
	window.requestAnimationFrame(animate);
}



// INIT GAME STUFF
// game.makeBars();
// game.makeTaps();
// patron.makePatron();
// bartender.makeBartender();
// game.startTimer();
// animate();


//	Event Listeners

document.addEventListener('keypress', (e) => {
	if (game.running) {
		if (["w", "s"].includes(e.key)) {
			if (!game.animToggle) {
				return
			}
			bartender.changeBar(e.key)
		}
		if ("1" === e.key) {
			game.startTimer();
		}
		if ("2" === e.key) {
			game.stopTimer();
		}
	}
})

document.addEventListener('keydown', (e) => {
	if (game.running) {	
		if (["a", "d"].includes(e.key)) {
			if (!game.animToggle) {
				return
			}
			bartender.run(e.key)
			// feature to be added later
		}
		if ("Space" === e.code) {
			if (!game.animToggle) {
				return
			}
			e.preventDefault();
			beer.makeBeer()
		}
	}
})


document.addEventListener('click', (e) => {
	if (e.target.id === 'reset') {
		// console.log('click');
		game.zeroScores();
		game.reset();
	}
	if (e.target.id === 'change-player') {
		// game.changePlayer();
		game.reset();
	}
	if (e.target.id === 'start-button') {
		game.init();
	}
})

// feature to add later 
// stop game timer that makes patrons when navigated away from the page
// document.addEventListener('unload', (e) => {
// 	console.log('page unloaded');
// })






