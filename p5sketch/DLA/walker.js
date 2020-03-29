class Walker {
  constructor(r) {
    this.pos = p5.Vector.random2D().setMag(r).add(createVector(width / 2, height / 2));
    this.step = 0;
    this.stuck = 0;
  }

  static initWithCoor(x, y) {
    let w = new Walker(1);
    w.pos.x = x;
    w.pos.y = y;
    return w;
  }

  randomStep() {
    // return p5.Vector.random2D()
    let x = p5.Vector.random2D();
    let centripete = this.pos.copy();
    centripete.sub(createVector(width / 2, height / 2));
    centripete.normalize();
    return x.add(centripete.mult(-0.5)).normalize(); // pretty without "-" sign and showing walker below
    // let x;
    // x = randomGaussian(0, 1);
    // return createVector(x, 0);
  }

  walk(N) {
    // let centripete = this.pos.copy();
    // centripete.sub(createVector(width / 2, height / 2));
    // centripete.setMag(-0.5 * centripete.dist(createVector(width / 2, height / 2)));
    //this.pos.add(p5.Vector.random2D());
    while (true) {
      this.step++;
      this.show(); // toggle to show walker traces
      if (this.step > N) {
        break;
      }
      this.pos.add(this.randomStep());
      // centripete.sub(createVector(width / 2, height / 2));
      // centripete.setMag(-0.5 * centripete.dist(createVector(width / 2, height / 2)));
      // this.show();
      if (this.hasNeighbour()) {
        this.stuck = 1;
        break;
      }

    }
  }

  hasNeighbour() {
    loadPixels();
    let id_x = round(this.pos.x);
    let id_y = round(this.pos.y);
    let index = (id_x + width * id_y) * 4;
    let index_up = (id_x + width * (id_y - 1)) * 4;
    let index_down = (id_x + width * (id_y + 1)) * 4;
    if (pixels[index] == 255 || pixels[index + 4] == 255 || pixels[index - 4] == 255 ||
      pixels[index_up] == 255 || pixels[index_up + 4] == 255 || pixels[index_up - 4] == 255 ||
      pixels[index_down] == 255 || pixels[index_down + 4] == 255 || pixels[index_down - 4] == 255) {
      console.log("Contact")
      return 1;
    } else {
      return 0;
    }
  }

  show() {
    stroke(250, 0, 255);
    point(this.pos.x, this.pos.y);
  }

}