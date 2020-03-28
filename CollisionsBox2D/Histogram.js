class Histogram {
    constructor (nclasses, nsteps, ntot, h) {
        this.nclasses = nclasses;
        this.nsteps = nsteps;
        this.classes = [];
        for (var i=0; i<nclasses; i++) {
            this.classes[i] = [];
            for (var k=0; k<nsteps; k++) {
                this.classes[i][k] = 0;
            }
        }
        this.height = h;
        this.widthbar = width/nsteps;
        this.ntot = ntot;
    }

    show() {
        rectMode(CORNER);
        push();
        translate(0, height-this.height);
        fill(255, 100);
        noStroke();
        rect(0, 0, width, this.height);
        for (var k =0; k< this.nsteps; k++) {
            let xpos = k*this.widthbar;
            // recovered
            fill(0, 255, 0, 100);
            rect(xpos, 0, this.widthbar, this.classes[2][k]/this.ntot*this.height);
            // neutral
            fill(100, 100);
            rect(xpos, this.classes[2][k]/this.ntot*this.height, this.widthbar, this.classes[0][k]/this.ntot*this.height);
            //ill
            fill(255, 0, 0, 100);
            rect(xpos, this.classes[2][k]/this.ntot*this.height+this.classes[0][k]/this.ntot*this.height, this.widthbar, this.classes[1][k]/this.ntot*this.height);
        }
        pop();
    }
}