let capture;
let previous = [];
let opticalflow = [];
let ball;


function setup() {
	createCanvas(320, 240); // original size of captured cam is: (640, 480)
	capture = createCapture(VIDEO);
	capture.size(320, 240);
	capture.hide();
	for (var i=0; i<width; i++) {
		previous[i] = [];
		opticalflow[i] = [];
		for (var j=0; j<height; j++) {
			previous[i][j] = 0.;
			opticalflow[i][j] = 0.;
		}
	}
	ball = new Ball(width/2, height/2);
}

function draw() {
	let offset;
	background(51);

	push();
	translate(width, 0);
	scale(-1, 1);
	image(capture, 0, 0, width, height); //width * capture.height / capture.width);
	pop();

	loadPixels();
	capture.loadPixels();
	for (var i=0; i<width; i++) {
		for (var j=0; j<height; j++) {
			offset = (j*width + (width-1-i))*4;
			// compute flow
			opticalflow[i][j] = Math.abs(capture.pixels[offset] - previous[i][j]) > 50 ? 255 : 0;
			
			// update all channels
			if (keyIsPressed) {
				pixels[offset] = opticalflow[width-1-i][j];
				pixels[offset+1] = opticalflow[width-1-i][j];
				pixels[offset+2] = opticalflow[width-1-i][j];
			}

			previous[i][j] = capture.pixels[offset];
		}
	}
	updatePixels();

	// Ball interaction
	ball.borders();
	ball.applyForce(opticalflow);
	ball.update();
	ball.show();
}