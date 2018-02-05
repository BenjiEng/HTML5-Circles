var canvas = document.querySelector('canvas');
// var innerWidth = window.innerWidth;
// var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

//context
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 50;

window.addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('mousemove', function(e) {
	mouse.x = e.x;
	mouse.y = e.y;
});

function Circle(x, dx, y, dy, radius, color) {

	this.x = x;
	this.dx = dx;
	this.y = y;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius
	this.color = color;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
	}

	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = - this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = - this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;


		//interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius)  {
			this.radius -= 1;
		}

		this.draw();
	}

}


//resets circles
var circles = []
function init() {
	circles = [];
	for (var i=0; i<200; i++) {
		var radius = Math.floor(Math.random() * 30) + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var dx = (Math.random() - 0.5)  //dx is x velocity
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dy = (Math.random() - 0.5)  //dx is y velocity
		var color = getRandomColor();
		circles.push(new Circle(x, dx, y, dy, radius, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	//clears the canvas x, y, w, h
	c.clearRect(0, 0, innerWidth, innerHeight);
	for(var i=0; i < circles.length; i++) {
		circles[i].update();
	}
}

animate();




//random color generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


init();
