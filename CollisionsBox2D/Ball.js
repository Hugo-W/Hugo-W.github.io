class Ball {
    constructor(x, y, social) {
        this.illtime = 0;
        this.r = 5;
        this.status = 0;
        this.socialdistance = social || false;
        // Body definition
        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.linearDamping = 0.0;
        bd.position = scaleToWorld(x, y);

        // Fixture definitions = physics + shape
        let fd = new box2d.b2FixtureDef();
        fd.shape = new box2d.b2CircleShape();
        fd.shape.m_radius = scaleToWorld(this.r);
        if (this.socialdistance) {
            fd.density = 1000.0;
        } else {
            fd.density = 1.0;
        }
        fd.friction = 0.0;
        fd.restitution = 1.; // elsaticity

        // FINALLY: create a body (bodydef + fixturedef)
        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);

        // Random velocity:
        // this.body.SetLinearVelocity(scaleToWorld(p5.Vector.random2D()));
        let vel = new box2d.b2Vec2(random(-50, 50), random(-50, 50));
        vel.SelfNormalize().SelfMul(this.socialdistance ? 0 : 7);
        this.body.SetLinearVelocity(vel);
        this.body.SetAngularVelocity(0, 0);

        // And to listen for collision:
        this.body.SetUserData(this);
    }

    change() {
        if (this.status==0) {
            this.status = 1;
            ill += 1;
            neutral -= 1;
        }
    }

    show() {
        // let's get all needed coords and all from our engine:
        let pos = scaleToPixels(this.body.GetPosition());
        if (this.status==0) {
            fill(255);
        }
        if (this.status==1) {
            fill(255,0,0);
        }
        if (this.status==2) {
            fill(0,255,0);
        }
        ellipse(pos.x, pos.y, this.r*2, this.r*2);
    }
}