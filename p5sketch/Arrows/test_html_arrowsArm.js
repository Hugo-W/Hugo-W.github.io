let tri_scale = 0.8;
var tri_size0;
var n_tri;
var lvl=0;

function setup() {
	createCanvas(600, 400);
	tri_size0 = width/5;
	background(80);
	//colorMode(HSB, 1);
  noFill();
	strokeWeight(1.5);
	stroke(255);
}

function draw() {
	var angle;
	
	push()
	rotate(PI);
	translate(-width/2, -height);
	fill(80, 20);
	noStroke();
	rect(-width/2, 0, width, height);
	//noFill();
	//fill(80);
	stroke(255);
	
	angle = map(mouseX, 0, width, -PI/8, PI/8);
	n_tri = floor(map(mouseY, height, 10, 1, 20));
	new_triangle(angle, 0, 0)
	
	pop();
	if (!mouseIsPressed) {
		copy(10,10,width-20,width-20,0,0,width, width);
	}

}// draw

function new_triangle(langle, summit, lvl) {
	if (lvl<n_tri) {
		push();
		translate(0, summit/2);
		
		let tri_size = tri_size0 * pow(tri_scale, lvl);
		let x0 = -tri_size/2;
		let y0 = 0;
		let x1 = tri_size/2;
		let y1 = 0;
		let x2 = 0;
		let y2 = sqrt(3)*tri_size/2;
		triangle(x0,y0,x1,y1,x2,y2)
		
		summit = y2;
		rotate(langle);
		new_triangle(langle, summit, lvl+1);
		pop();
	}
}

function mousePressed() {
	background(80)
}
