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
	makeBars () {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Rectangle (0, 100 + (i * (700 / this.numBars)), 600, 50, 'brown')
			bar.draw()
			this.bars.push(bar);
		}
	},
	makeTaps() {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Rectangle (770, 100 + (i * (700 / this.numBars)), 30, 50, 'brown')
			bar.draw();
			this.bars.push(bar);
		}
	}
}

game.makeBars();
game.makeTaps();

const bartender = {
	x: 740,
	y: null,
	currentBar: 2,
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
	updatePosition () {
		
	}
}

// bartender.makeBartender();

// console.log(bartender.y);
// console.log(board.bars[bartender.currentBar].y);

bartender.getY();
bartender.makeBartender();




//






