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

// class Bar {
// 	constructor () {

// 	}
// }

// class Patron {
// 	constructor() {

// 	}
// }