let world;
let reset;

let honey_txt;
let dragon_txt;
let crab_txt;
let pentoad_txt;
let honeyhive;
let glider_txt;
let edgerepair_txt;
let run;
let size;

let inserting=false;
let running=false;

let pattern;
let select;

var zoom = 1.00;
var zMin = 1.;
var zMax = 50.00;
var sensitivity = 0.05;

function preload(){
	honey_txt = loadStrings('./assets/honeyfarm.txt');
	dragon_txt = loadStrings('./assets/dragon.txt');
	crab_txt = loadStrings('./assets/crab.txt');
	pentoad_txt = loadStrings('./assets/pentaod.txt');
	edgerepair_txt = loadStrings('./assets/edge-repair.txt');
	glider_txt = loadStrings('./assets/glider.txt');
	honeyhive = loadStrings('./assets/honey_hive.txt');
}

function setup() {
	createCanvas(600, 600);
	world = new World(100, 100);
	background(255);

	reset = createButton("Reset");
	reset.mousePressed(reset_world);

	run = createButton("Run");
	run.mousePressed(run_simu);

	select = createSelect();
	for (var opt of ["Honey Hive (still life)", "Glider", "Pentoad (oscillator)", "Honey Farm (oscillator)", "Crab (spaceship)", "Dragon (spaceship)", "Edge repair"]) {
		select.option(opt)
	}

	drop = createButton("Drag and Drop selected object");
	drop.mousePressed(drop_insertion);

	input = createInput("100");
}

function draw() {
	background(255);
	scale(zoom);
	if (!inserting) {
		if (mouseIsPressed ) {
			if (mouseButton == LEFT) {
				world.draw(1);
			} else {
				world.draw(0);
			}
			
		}
		if (keyIsPressed || running) {
			console.log("Living!")
			world.live();
		}
	} else {
		//mouseReleased();
	}
	world.display();
}

function reset_world() {
	size = int(input.value());
	world = new World(min(width, size), min(height, size));
	background(255);
	running = false;
	run.elt.innerHTML = "Run";
	zoom = 1.;
}

function drop_insertion() {
	let txt_select;
	switch (select.value()) {
		case "Pentoad (oscillator)":
			txt_select = pentoad_txt;
			break;
		case "Honey Farm (oscillator)":
			txt_select = honey_txt;
			break;
		case "Crab (spaceship)":
			txt_select = crab_txt;
			break;
		case "Dragon (spaceship)":
			txt_select = dragon_txt;
			break;
		case "Honey Hive (still life)":
			txt_select = honeyhive;
			break;
		case "Glider":
			txt_select = glider_txt;
			break;
		case "Edge repair":
			txt_select = edgerepair_txt;
			break;
		default:
			txt_select = glider_txt;
			break;
	}
	console.log(select.elt.value);
	let maxlen=0;
	for (var j=0; j<txt_select.length; j++) {
		if (txt_select[j].length > maxlen) {
			maxlen = txt_select[j].length;
		}
	}
	pattern = make2DArray(txt_select.length, maxlen);
	for (var j=0; j<txt_select.length; j++) {
		for (var i=0; i<txt_select[j].length; i++) {
			if (txt_select[j][i] == 'O') {
				pattern[i][j] = 1;
			}
		}
	}
	inserting = true;
}

function mouseReleased() {
	if (inserting) {
		world.set(pattern, world.getWorldCoord(mouseX, mouseY));
		inserting=false;
	}
}

function run_simu() {
	running = running ? false : true;
	run.elt.innerHTML = running ? "Pause" : "Run";
}

function mouseWheel(event) {
	zoom -= sensitivity * event.delta;
	zoom = constrain(zoom, zMin, zMax);
	//uncomment to block page scrolling
	console.log("zoom")
	return false;
  }