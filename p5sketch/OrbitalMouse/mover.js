class Mover {
  //m = 1;
  //r = 25;
  constructor(m, r) {
    this.m=m;
    this.r=r;
    this.pos = createVector(0, 0)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  addForce(force) {
    let friction = this.vel.copy();
    friction.mult(0.05);
    friction.div(this.m)
    this.acc.add(force).sub(friction)
  }

  show() {
    stroke(255)
    fill(255, 100)
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}