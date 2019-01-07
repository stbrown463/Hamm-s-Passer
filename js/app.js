console.log('Tapper!');

const canvas = document.getElementById('board');
// console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);


// make one bar
function makeBar (x, y, width, height, color) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fillStyle = color;
	ctx.fill();
}

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



// class Patron {
// 	constructor() {

// 	}
// }

const game = {
	numBars: 3,
	bars: [],
	taps: [],
	makeBars () {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Rectangle (0, 100 + (i * (700 / this.numBars)), 650, 50, 'brown')
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
	}
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
	bartenderArray: [],
	makeBartender () {
		const bartender = new Rectangle (this.x, this.y, this.width, this.height, this.color)
		bartender.draw();
		this.bartenderArray.push(bartender);
	},
	getY () {
		this.y = game.bars[this.currentBar].y - 25;
	},
	setY () {
		this.bartenderArray[0].y = this.y
	},
	draw () {
		this.bartenderArray[0].draw();
	},
	changeBar (dir) {
		
		if (dir === "w" && this.currentBar != 0) {
			game.eraseBoard();
			this.currentBar--
			this.getY()
			this.setY()
			game.drawBoard();
			this.draw();
		}
		if (dir === "s" && this.currentBar != game.numBars - 1) {
			game.eraseBoard();
			this.currentBar++
			this.getY()
			this.setY()
			this.draw()
			game.drawBoard()
			this.draw();
			
		}
		// this.bartenderArray[0].draw();
	},
	run (dir) {
		console.log("I'm running");
	}
}

// bartender.makeBartender();

// console.log(bartender.y);
// console.log(board.bars[bartender.currentBar].y);

bartender.getY();
bartender.makeBartender();




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
})






