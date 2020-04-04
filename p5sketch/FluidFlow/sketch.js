let fluid;
let previous;
let N = 85;
let SCALE;

// Constants
let dt = 0.1;
let Diff_dens = 0.05;
let visc = 100;
let inject_ink = 50;
let inject_speed = inject_ink * 80;

let trender;

function reset() {
	
	fluid = new Flow2D(N, N, SCALE);
	fluid.boundary_density_fixed(0);
	fluid.boundary_flow();
	previous = new Flow2D(N, N, SCALE);
	previous.setAll(fluid);
}

function setup() {
	SCALE = floor(windowWidth / N);
	createCanvas(N * SCALE, N * SCALE);

	reset();

	trender = createDiv('');
}

function draw() {
	background(51);	

	if (mouseIsPressed && (mouseButton === LEFT || touches.length==2)) {
		previous.addDensity(mouseX, mouseY);
		fluid.addDensity(mouseX, mouseY);
		// fluid.addVelocity();
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

function touchMoved() {
	if (mouseButton === CENTER || touches.length >= 1) {
        fluid.addVelocity();
    }
	// prevent default
	return false;
  }
