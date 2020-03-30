let world;
let reset;
let honeyfarm;
let dragon;
let crab;
let honey_txt;
let dragon_txt;
let crab_txt;

let size;

let inserting=false;
let pattern;

function preload(){
	honey_txt = loadStrings('./assets/honeyfarm.txt');
	dragon_txt = loadStrings('./assets/dragon.txt');
	crab_txt = loadStrings('./assets/dragon.txt');
}

function setup() {
	createCanvas(600, 600);
	world = new World(100, 100);
	background(255);

	reset = createButton("reset");
	reset.mousePressed(reset_world);

	honeyfarm = createButton("Insert Honey Farm (osc)");
	honeyfarm.mousePressed(honeyfarm_insertion);

	dragon = createButton("Dragon (spaceship)");
	dragon.mousePressed(dragon_insertion);

	crab = createButton("Dragon (spaceship)");
	crab.mousePressed(dragon_insertion);

	input = createInput("100");
}

function draw() {
	background(255);
	if (!inserting) {
		if (mouseIsPressed ) {
			if (mouseButton == LEFT) {
				world.draw(1);
			} else {
				world.draw(0);
			}
			
		}
		if (keyIsPressed) {
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
}

function honeyfarm_insertion() {
	pattern = make2DArray(honey_txt.length, honey_txt[0].length);
	for (var i=0; i<honey_txt[0].length; i++) {
		for (var j=0; j<honey_txt.length; j++) {
			if (honey_txt[j][i] == 'O') {
				pattern[i][j] = 1;
			}
		}
	}
	inserting = true;
}

function dragon_insertion() {
	pattern = make2DArray(dragon_txt.length, dragon_txt[0].length);
	for (var i=0; i<dragon_txt[0].length; i++) {
		for (var j=0; j<dragon_txt.length; j++) {
			if (dragon_txt[j][i] == 'O') {
				pattern[i][j] = 1;
			}
		}
	}
	inserting = true;
}

function crab_insertion() {
	pattern = make2DArray(crab_txt.length, crab_txt[0].length);
	for (var i=0; i<crab_txt[0].length; i++) {
		for (var j=0; j<crab_txt.length; j++) {
			if (crab_txt[j][i] == 'O') {
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