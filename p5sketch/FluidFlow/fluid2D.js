class Flow2D {
    constructor(size_x, size_y, scale) {
        this.density = [];
        this.flow = {vx: [], vy: []};
        let noise_scale = 0.01*scale;
        for (var x=0; x<size_x; x++) {
            this.density[x] = [];
            this.flow.vx[x] = [];
            this.flow.vy[x] = [];
            for (var y=0; y<size_y; y++) {
                this.density[x][y] = 0.;
                this.flow.vx[x][y] = 0.;//map(noise(x*noise_scale, y*noise_scale), 0, 1, -10, 10);
                this.flow.vy[x][y] = 0.;//map(noise(x*noise_scale+ 1000, y*noise_scale + 1000), 0, 1, -10, 10);
            }
        }
        this.size_x = size_x;
        this.size_y = size_y;
        this.scale = scale;
        this.incr = 0;
    }

    addDensity(i, j) {
        let xy = this.canvasCoordtoXY(i, j);
        this.density[xy[0]][xy[1]] += inject * dt;
    }

    addVelocity() {
        let xy = this.canvasCoordtoXY(mouseX, mouseY);
        this.flow.vx[xy[0]][xy[1]] += inject * (mouseX-pmouseX);
        this.flow.vy[xy[0]][xy[1]] += inject * (mouseY-pmouseY);
    }

    boundary_density_fixed(val) {
        for (var x=0; x<this.size_x; x++) {
            this.density[x][0] = val;
            this.density[x][this.size_y-1] = val;
        }
        for (var y=0; y<this.size_y; y++) {
            this.density[0][y] = val;
            this.density[this.size_x-1][y] = val;
        }
    }

    boundary_flow() {
        for (var x=0; x<this.size_x; x++) {
            this.flow.vx[x][0] = -this.flow.vx[x][1];
            this.flow.vy[x][0] = -this.flow.vy[x][1];

            this.flow.vx[x][this.size_y-1] = -this.flow.vx[x][this.size_y-2];
            this.flow.vy[x][this.size_y-1] = -this.flow.vy[x][this.size_y-2];
        }
        for (var y=0; y<this.size_y; y++) {
            this.flow.vx[0][y] = this.flow.vx[1][y];
            this.flow.vy[0][y] = this.flow.vy[1][y];

            this.flow.vx[this.size_x-1][y] = this.flow.vx[this.size_x-2][y];
            this.flow.vy[this.size_x-1][y] = this.flow.vy[this.size_x-2][y];
        }
    }

    advection(previous, current) {
        let dt0 = dt;//this.size_x;
        let x_ori;
        let y_ori;
        let i_ori;
        let j_ori;
        for (var x=1; x<this.size_x-1; x++) {
            for (var y=1; y<this.size_y-1; y++) {
                x_ori = x - dt0*this.flow.vx[x][y];
                y_ori = y - dt0*this.flow.vy[x][y];
                if (x_ori<1.5) {x_ori = 1};
                if (y_ori<1.5) {y_ori = 1};
                if (x_ori>this.size_x-1.5) {x_ori = this.size_x-1.5};
                if (y_ori>this.size_y-1.5) {y_ori = this.size_y-1.5};
                // x_ori = constrain(x_ori, 1, this.size_x - 2.5);
                // y_ori = constrain(y_ori, 1, this.size_x - 2.5);
                i_ori = int(x_ori);
                j_ori = int(y_ori);
                current[x][y] = (1 + i_ori - x_ori) * ((1-y_ori + j_ori) * previous[i_ori][j_ori] + (y_ori - j_ori) * previous[i_ori][j_ori+1]) +
                                (x_ori - i_ori) * ((1-y_ori + j_ori) * previous[i_ori+1][j_ori] + (y_ori - j_ori) * previous[i_ori+1][j_ori+1]);
            }
        }
    }

    diffusion(previous, current, D) {
        // stable diffusion (Gauss-siedl inversion to substract backward diffusion)
        for (var k=0; k<10; k++) {
            for (var x=1; x<this.size_x-2; x++) {
                for (var y=1; y<this.size_y-2; y++) {
                    current[x][y] = (previous[x][y] + D * dt * (current[x-1][y] + current[x+1][y] +
                                                                            current[x][y-1] + current[x][y+1]))/(1 + 4* D * dt);
                    }
                }
        }
    }

    divergenceCorrection(){
        return 1;
    }

    updateFlow(previous) {
        // for (var x=1; x<this.size_x-2; x++) {
        //     for (var y=1; y<this.size_y-2; y++) {
        // Propagate flow
        let tmp;
       
        tmp = this.flow.vx;
        this.flow.vx = previous.flow.vx;
        previous.flow.vx = tmp;
        tmp = this.flow.vy;
        this.flow.vy = previous.flow.vy;
        previous.flow.vy = tmp;
        this.diffusion(previous.flow.vx, this.flow.vx, visc);
        this.diffusion(previous.flow.vy, this.flow.vy, visc);
        this.divergenceCorrection();
        tmp = this.flow.vx;
        this.flow.vx = previous.flow.vx;
        previous.flow.vx = tmp;
        tmp = this.flow.vy;
        this.flow.vy = previous.flow.vy;
        previous.flow.vy = tmp;
        this.advection(previous.flow.vx, this.flow.vx);
        this.advection(previous.flow.vy, this.flow.vy);
        this.divergenceCorrection();

        // Propagate density (dye, or whatever...)
        tmp = this.density;
        this.density = previous.density;
        previous.density = tmp;
        this.diffusion(previous.density, this.density, Diff_dens);
        tmp = this.density;
        this.density = previous.density;
        previous.density = tmp;
        this.advection(previous.density, this.density);
        //     }
        // }
    }

    renderDensity() {
        noStroke();

        for (var x=0; x<this.size_x; x++) {
            for (var y=0; y<this.size_y; y++) {
                fill(int(this.density[x][y] * 255));
                rect(x*this.scale, y*this.scale, this.scale, this.scale);
            }
        }
    }

    renderFlow() {
        // noFill();
        stroke(255);
        for (var x=0; x<this.size_x; x++) {
            for (var y=0; y<this.size_y; y++) {
                let v = createVector(this.flow.vx[x][y], this.flow.vy[x][y]);
                let pos = createVector(x*this.scale + this.scale/2, y*this.scale + this.scale/2);
                line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);
            }
        }
    }

    fadeDensity() {
        for (var x=0; x<this.size_x; x++) {
            for (var y=0; y<this.size_y; y++) {
                this.density[x][y] *= 0.99;
            }
        }
    }


    canvasCoordtoXY(i, j){
        return [constrain(floor(i/this.scale), 0, this.size_x-1), constrain(floor(j/this.scale), 0, this.size_y-1)];
    }

    xyToCanvasCoord(x, y){
        return [x*this.scale, y*this.scale];
    }

    setAll(flow) {
        for (var x=0; x<this.size_x; x++) {
            for (var y=0; y<this.size_y; y++) {
                this.density[x][y] = flow.density[x][y];
                this.flow.vx[x][y] = flow.flow.vx[x][y];
                this.flow.vy[x][y] = flow.flow.vy[x][y];
            }
        }
    }

}