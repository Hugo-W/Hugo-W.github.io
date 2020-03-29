var m;
let trace = [];
let n = 200;

function setup() {
  createCanvas(400, 400);
  m = new Mover(10, 15);
}

function draw() {
  background(42);
  translate(width / 2, height / 2);

  trace.splice(0, 0, [m.pos.x, m.pos.y])

  // Add attraction to mouse:
  force = createVector(mouseX - width / 2, mouseY - height / 2)
  force.sub(m.pos)
  force.mult(0.0005);
  m.addForce(force);

  // Update belocity and position
  m.update();

  // draw trace
  beginShape();
  noFill();
  stroke(255, 0, 255);
  colorMode(HSB);
  for (var i = 0; i < trace.length; i++) {
    stroke(map(sin(TAU * frameCount / 150 ), -1, 1, 0, 255), 100, 100);
    vertex(trace[i][0], trace[i][1])
  }
  endShape();
  colorMode(RGB);

  if (trace.length > n) {
    trace.pop()
  }

  m.show()
}

function mousePressed() {
  background(42);
  translate(width / 2, height / 2);
  m = new Mover(10, 15);
  trace = [];
}