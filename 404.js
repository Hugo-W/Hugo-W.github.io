function setup() {
    var canv = createCanvas(windowWidth,400);
    background(253);
    noCursor();
    
    canv.parent("sketch");
}

function draw() {
    background(253, 100);
    textSize(40);
    text("404", mouseX, mouseY);
    copy(0,0, width, height, -10, -10, width+20, height+20)
}
