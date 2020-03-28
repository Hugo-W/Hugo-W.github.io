// Let us build some simple world physics with collision using the box2d library

// a reference to the world:
let world;
let below;
let above;
let rightedge;
let leftedge;
// Particles list
let bodies = [];
let N = 150; // number of particles
let recovery = 25*50;
// geometry
let top_wall;
let bottom_wall;
// type of society
let rules = 0;
let slider;
// histogram
let histogram;
let recovered = 0;
let ill = 0;
let neutral = 0;
let k_step = 0;
let tstart;


function setup() {
	tstart = millis();
	var canvas = createCanvas(800, 600);
	canvas.parent('sketch-div');

	slider = createSlider(30, 250, 150);
	slider.parent('slider1-div');

	setupWorld();

	var reset = createButton("Reset");
	reset.mousePressed(setupWorld);
	var distancing = createButton("Social Distancing");
	distancing.mousePressed(setupWorld_distancing);
	var lockedown = createButton("Partial Lockedown");
	lockedown.mousePressed(setupWorld_ld);
}

function draw() {
	background(51);

	// step time through the world
	world.Step(1./60., 6, 2);

	for (var i=0; i<N; i++) {
		bodies[i].show();
		if (bodies[i].status==1) {
			bodies[i].illtime += 1;
			if (bodies[i].illtime > recovery) {
				bodies[i].status = 2;
				recovered += 1;
				ill -= 1;
			}
		}
	}

	rightedge.display();
	// walls
	if (rules==2) {
		top_wall.display();
		bottom_wall.display();
	}

	// Histogram
	histogram.classes[0][k_step] = neutral;
	histogram.classes[1][k_step] = ill;
	histogram.classes[2][k_step] = recovered;
	histogram.show()
	if (millis()-tstart > 500) {
		k_step += 1;
		tstart = millis();
	}
}

function setupWorld() {
	background(51);
	k_step = 0;
	recovered = 0;
	ill = 0;
	neutral = 0;

	rules = 0;
	N = slider.value();
	histogram = new Histogram(3, 90, N, 50);

	// init the world:
	world = createWorld(0);
	world.SetContactListener(new CustomListener());
	leftedge = new Surface(0, height/2, 5, height*2);
	below = new Surface(0, height-5, width*2, 5);
	above = new Surface(0, 0, width*2, 5);
	rightedge = new Surface(width-1, 10, 5, height*2);

	// particules
	for (var i=0; i<N; i++) {
		// bodies[i] = new Ball(random(0, width), random(0, height));
		if (random() < 0.) { // how much of populatino applies social distancing (here being immobile)
			bodies[i] = new Ball(random(0, width), random(0, height), true);
		} else {
			bodies[i] = new Ball(random(0, width), random(0, height), false);
		}
		if (random()<0.02) {
			bodies[i].status = 1;
			ill += 1;
		} else {
			neutral += 1;
		}
	}
}

function setupWorld_ld() {
	background(51);
	k_step = 0;
	recovered = 0;
	ill = 0;
	neutral = 0;
	
	rules = 2;
	N = slider.value();
	histogram = new Histogram(3, 90, N, 50);

	// init the world:
	world = createWorld(0);
	world.SetContactListener(new CustomListener());
	leftedge = new Surface(0, height/2, 5, height*2);
	below = new Surface(0, height-5, width*2, 5);
	above = new Surface(0, 0, width*2, 5);
	rightedge = new Surface(width-1, 10, 5, height*2);

	// lockedown surfaces
	top_wall = new Surface(width/4, 0, 5, height-20);
	bottom_wall = new Surface(width/4, height, 5, height-20);

	// particules
	for (var i=0; i<N; i++) {
		// bodies[i] = new Ball(random(0, width), random(0, height));
		if (random() < 0.) { // how much of populatino applies social distancing (here being immobile)
			bodies[i] = new Ball(random(0, width), random(0, height), true);
		} else {
			bodies[i] = new Ball(random(0, width), random(0, height), false);
		}
		if (random()<0.02) {
			bodies[i].status = 1;
			ill += 1;
		}  else {
			neutral += 1;
		}
	}
}

function setupWorld_distancing() {
	background(51);
	k_step = 0;
	recovered = 0;
	ill = 0;
	neutral = 0;
	
	rules = 1;
	N = slider.value();
	histogram = new Histogram(3, 90, N, 50);

	// init the world:
	world = createWorld(0);
	world.SetContactListener(new CustomListener());
	leftedge = new Surface(0, height/2, 5, height*2);
	below = new Surface(0, height-5, width*2, 5);
	above = new Surface(0, 0, width*2, 5);
	rightedge = new Surface(width-1, 10, 5, height*2);

	// particules
	for (var i=0; i<N; i++) {
		// bodies[i] = new Ball(random(0, width), random(0, height));
		if (random() < 0.75) { // how much of populatino applies social distancing (here being immobile)
			bodies[i] = new Ball(random(0, width), random(0, height), true);
		} else {
			bodies[i] = new Ball(random(0, width), random(0, height), false);
		}
		if (random()<0.02) {
			bodies[i].status = 1;
			ill += 1;
		}  else {
			neutral += 1;
		}
	}
}