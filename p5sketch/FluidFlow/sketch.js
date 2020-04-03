let fluid;
let previous;
let N = 80;
let SCALE = 6;

// Constants
let dt = 0.1;
let Diff_dens = 0.1;
let visc = 10;
let inject = 100;

let trender;

function reset() {
	fluid = new Flow2D(N, N, SCALE);
	fluid.boundary_density_fixed(0);
	fluid.boundary_flow();
	previous = new Flow2D(N, N, SCALE);
	previous.setAll(fluid);
}

function setup() {
	createCanvas(N * SCALE, N * SCALE);

	reset();

	trender = createDiv('');
}

function draw() {
	background(51);	

	if (mouseIsPressed) {
		previous.addDensity(mouseX, mouseY);
		fluid.addDensity(mouseX, mouseY);
		fluid.addVelocity();
	}

	// if (keyIsDown(RIGHT_ARROW)) {
	fluid.updateFlow(previous);
	// }

	if (keyIsPressed && keyIsDown(UP_ARROW)) {
		fluid.renderFlow();
	} else {
		fluid.renderDensity();
	}

	// Swap
	previous.setAll(fluid);
	// Fade density
	fluid.fadeDensity();

	trender.elt.innerText = "FPS: " + str(frameRate());
}

function keyPressed() {
	if (keyCode==82) {
		reset();
	}
}