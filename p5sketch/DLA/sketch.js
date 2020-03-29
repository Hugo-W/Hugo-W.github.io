let cluster = [];
let Nsteps = 800;
var w;
let rad = 5;
let margin = 10;

function setup() {
  createCanvas(400, 400);
  background(42);
  
  // seed
  cluster[0] = createVector(width/2, height/2);
}

function draw() {
  stroke(255);
  background(42, 50);
  for (var c = 0; c < cluster.length; c++) {
    point(cluster[c].x, cluster[c].y);
  }
  
  if (mouseIsPressed) {
    w = Walker.initWithCoor(mouseX, mouseY);
  } else {
    w = new Walker(rad + margin);
  }
  console.log(rad);
  w.walk(Nsteps)
  if (w.stuck) {
    //w.show();
    cluster.push(w.pos);
    if (w.pos.x-width/2 > rad || w.pos.y-height/2 > rad) {
      rad = max(w.pos.x-width/2, w.pos.y - height/2);
      console.log(rad);
    }
  }
  
}

function mousePressed() {
  loadPixels()
    let id_x = round(mouseX);
    let id_y = round(mouseY);
    let index = (id_x + width * id_y) * 4;
    let index_up = (id_x + width * (id_y - 1)) * 4;
    let index_down = (id_x + width * (id_y + 1)) * 4;
    if (pixels[index] == 255 || pixels[index + 4] == 255 || pixels[index - 4] == 255 ||
      pixels[index_up] == 255 || pixels[index_up + 4] == 255 || pixels[index_up - 4]  == 255||
      pixels[index_down] == 255 || pixels[index_down + 4] == 255 || pixels[index_down - 4] == 255) {
      console.log(id_x, id_y)
      console.log(pixels[index])
      console.log("Close")
    } else {
      console.log("Not here")
      console.log(id_x, id_y)
    }
}