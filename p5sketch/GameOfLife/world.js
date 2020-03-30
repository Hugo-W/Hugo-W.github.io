class World {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.sizex = width/cols;
        this.sizey =  height/rows;
        this.world = make2DArray(rows, cols);
    }

    getPixelLoc(x, y) {
        return createVector(this.sizex*x, this.sizey*y);
    }

    getWorldCoord(i, j) {
        return createVector(round(i/this.sizex), round(j/this.sizey));
    }

    countneighbours(x, y) {
        let sum = 0;
        let i_;
        let j_;
        // for (var i=max(0, x-1); i<min(x+2, this.cols); i++) {
        //     for (var j=max(0, y-1); j<min(y+2, this.rows); j++) {
        //         sum += this.world[i][j];
        //     }
        // }

        // Periodic borders?
        for (var i=x-1; i<x+2; i++) {
            for (var j=y-1; j<y+2; j++) {
                if (i<0) {i_=this.cols-1} else {i_=i}
                if (j<0) {j_=this.rows-1} else {j_=j}
                sum += this.world[i_%this.cols][j_%this.rows];
            }
        }
        return sum - this.world[x][y];
    }

    live() {
        let neighbours = 0;
        let nextState = make2DArray(this.rows, this.cols);
        for (var i = 0; i<this.cols; i++) {
            for (var j=0; j<this.rows; j++) {
                neighbours = this.countneighbours(i, j);
                // births
                if (this.world[i][j]==0 && neighbours==3) {
                    nextState[i][j]=1;
                }
                // deaths
                if (this.world[i][j]==1 && (neighbours>3 || neighbours<2)) {
                    nextState[i][j]=-1;
                }
            }
        }
        for (var i = 0; i<this.cols; i++) {
            for (var j=0; j<this.rows; j++) {
                this.world[i][j] += nextState[i][j];
            }
        }
    }

    draw(mode){
        //this.livecells.add(this.getWorldCoord(mouseX, mouseY));
        if (mouseX<width && mouseY< height) {
            let worldpos = this.getWorldCoord(mouseX, mouseY);
            console.log("drawing at " + worldpos)
            this.world[worldpos.x][worldpos.y] = mode;
        }
    }

    set(pattern, loc2D) {
        for (var i=0; i<pattern.length; i++) {
            for (var j=0; j<pattern[0].length; j++) {
                this.world[(loc2D.x+i)%this.cols][(loc2D.y+j)%this.rows] = pattern[i][j];
            }
        }
    }

    display(){
        fill(0);
        for (var i = 0; i<this.cols; i++) {
            for (var j=0; j<this.rows; j++) {
                if (this.world[i][j]==1) {
                    rect(this.getPixelLoc(i, j).x, this.getPixelLoc(i, j).y, this.sizex, this.sizey);
                }
            }
        }
    }
}

function make2DArray(rows, cols) {
    let out = new Array(rows);
    for (var i=0; i<cols; i++) {
        out[i] = new Array(rows);
        for (var j=0; j<rows; j++) {
            out[i][j] = 0;
        }
    }
    return out
}