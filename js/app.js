console.log('Tapper!');

const canvas = document.getElementById('board');
// console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

function makeBar (x, y, width, height, color) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fillStyle = color;
	ctx.fill();
}

makeBar(0, 100, 600, 50, 'brown');

class Bar {
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

const board = {
	numBars: 3,
	bars: [],
	makeBars () {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Bar (0, 100 + (i * (700 / this.numBars)), 600, 50, 'brown')
			bar.draw()
			board.bars.push(bar);
		}
	},
	makeTaps() {
		for (let i = 0; i < this.numBars; i++) {
			const bar = new Bar (770, 100 + (i * (700 / this.numBars)), 30, 50, 'brown')
			bar.draw()
			board.bars.push(bar);
		}
	}
}

board.makeBars();
board.makeTaps();
















