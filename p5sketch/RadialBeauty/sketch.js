
// 
// Author: Hugo Weissbart
function setup() {
    initializeFields();
    createCanvas(600, 400);
    background(color(0x11, 0x11, 0x11));
    stroke(color(0x52, 0x70, 0xB9, 50));
    noFill();
    frameRate(500);
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
    translate(width / 2, height / 2);
    rotate(t / 200);
    // Mandala 1
    // ellipse(cos(t/periodX) * ampX, sin(t/periodY) * ampY,  // position
    // cos(t/periodX) * ampX, sin(t/periodY) * ampY); // radius
    // Mandala 2
    // line(cos(t/periodX) * 300, sin(t/periodY) * 200,  // position A
    // cos(t/radX) * 300, sin(t/radY) * 200); // position B
    // Mandala set 3
    line(// position A
    sin(t / 60) * 200 + cos(t / 30) * 30, // position A
    cos(t / 60) * 200 + sin(t / 30) * 30, cos(t / 60) * 200 + sin(t / 30) * 30, // position B
    cos(t / 60) * 200 + cos(t / 30) * 30);
}

function initializeFields() {
}

