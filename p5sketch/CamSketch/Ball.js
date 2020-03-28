class Ball {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2.5);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(flow) {
        let force = createVector();
        var row;
        var col;
        for (var r=0; r<TAU;r+=PI/30) {
            row = min(round(this.pos.x + 5*cos(r)), width-1);
            col = min(round(this.pos.y + 5*sin(r)), height-1);
            if (flow[row][col] > 100) {
                force.add(this.pos.copy().sub(createVector(row, col)).normalize().mult(0.2));
                console.log("Felt something");
            }
        }

        this.acc.add(force);
        // this.vel.add(force.normalize().mult(1.5));
        // this.pos.add(force.normalize().mult(5));
    }

    borders() {
        if (this.pos.x + 5 > width) {
            this.vel.x *= -1;
            this.pos.x = width-5;
        }
        if (this.pos.x - 5 < 0) {
            this.vel.x *= -1;
            this.pos.x = 5;
        }
        if (this.pos.y + 5 > height) {
            this.vel.y *= -1;
            this.pos.y = height-5;
        }
        if (this.pos.y - 5 < 0) {
            this.vel.y *= -1;
            this.pos.y = 5;
        }
    }

    show() {
        fill(250, 0, 100);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}