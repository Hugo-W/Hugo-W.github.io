
// 
// Author: Hugo Weissbart

let set;

function setup() {
    initializeFields();
    createCanvas(800, 600);
    background(color(0x11, 0x11, 0x11));
    stroke(color(0x52, 0x70, 0xB9, 50));
    noFill();
    frameRate(500);
    set = 0;
}

function draw() {
    var t = float(frameCount);
    var periodX = 300;
    var periodY = 30;
    var radX = 100;
    var radY = 50;
    var periodRot = 100;
    var ampX = 200;
    var ampY = 300;
    push();
    translate(width / 2, height / 2);
    rotate(t / 200);

    if (set == 0) {
        // Mandala 1
        ellipse(cos(t/periodX) * ampX, sin(t/periodY) * ampY,  // position
        cos(t/periodX) * ampX, sin(t/periodY) * ampY); // radius
    }
    if (set == 1) {
        // Mandala 2
        line(cos(t/periodX) * 300, sin(t/periodY) * 200,  // position A
        cos(t/radX) * 300, sin(t/radY) * 200); // position B
    }
    if (set == 2) {
        // Mandala set 3
        line(
            sin(t / 60) * 200 + cos(t / 30) * 30,
            cos(t / 60) * 200 + sin(t / 30) * 30,
            
            cos(t / 60) * 200 + sin(t / 30) * 30, 
            cos(t / 60) * 200 + cos(t / 30) * 30
            );
    }
    pop();

    text("FPS: " + toString(frameRate()), -width/2 +10, -height/2 + 10);
}

function initializeFields() {
}

function mousePressed() {
    background(color(0x11, 0x11, 0x11));
    set += 1;
    set = set % 3;
}