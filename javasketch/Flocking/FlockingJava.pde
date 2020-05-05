Flock flock;
float bird_size = 10.;
World env;
boolean targetOn = false;
int target_ind;
Attractor attractor;

float separation_size = bird_size *2;
float cohesion_size = bird_size * 10;
float alignment_dist = bird_size *5;
float maxspeed = 5;
float maxsteer = 0.8;

void setup() {
    size(800, 600);
    flock = new Flock(250);
    env = new World();
    
    // Controls
    
  background(255);
}

void draw() {
    //background(255);
    fill(255, 80);
    rect(0, 0, width, height);
    cursor();
    
    if (targetOn) {
       if (attractor.attractType) {
         fill(0, 200, 0);
       } else {
         fill(200, 0, 0);
       }
       noCursor();
       ellipse(mouseX, mouseY, 20, 20);
       attractor.attract(flock);
       attractor.pos.x=  mouseX;
       attractor.pos.y=  mouseY;
    }
    
    flock.run(env);
    env.show();
}

void mousePressed() {
  if (mouseButton == CENTER) {
     targetOn = true;
     //target_ind = env.addFood(mouseX, mouseY);
     attractor = new Attractor(false);
  }
  if (mouseButton == LEFT) {
     env.addFood(mouseX, mouseY);
  }
  if (mouseButton == RIGHT) {
     env.addPredator(mouseX, mouseY);
  }
}

void mouseReleased() {
  if (mouseButton == CENTER) {
     targetOn = false; 
     //env.removeFood(target_ind);
  }
}

public class Attractor {
   boolean attractType;
   PVector pos;
   
   Attractor(boolean type) {
       attractType = type;
       pos = new PVector(mouseX, mouseY);
   }
   
   void attract(Flock flock) {
       for (Vehicle v: flock.boids) {
          float dist = v.pos.dist(pos);
          PVector steer;
          steer = v.seek(pos);
          steer.mult(attractType ? 1:-1/(0.01 * dist));
          steer.limit(maxsteer);
          v.applyForce(steer);
       }
   }
}

// We will use this class to control the whole fllock and give each boids a view on the rest
// ideally we could give them only a view of neighbour and set up a grid for coarser and faster computation

public class Flock {
    ArrayList<Vehicle> boids;

    //Constructor
    Flock(int n) {
        boids = new ArrayList<Vehicle>();
        for (int i=0; i<n; i++) {
            boids.add(new Vehicle(random(width), random(height)));
        }
    }

    void run(World env) {
        for (Vehicle boid : boids) {
            
            boid.run(boids, env);
            
            // OR
            // Flock neighbours = boid.getNeighbours();
            // boid.run(neighbours);
        }
    }

    void addBoid(Vehicle b) {
        boids.add(b);
    }

}
final PVector gravity = new PVector(0, .1);
final float wind_to_grav = 1.5;

public class Vehicle {
    // Params
    PVector pos;
    PVector vel;
    PVector acc;
    float size = bird_size;
    // individual strength and need for speed
    //float maxspeed;
    //float maxsteer;
    float food_sense = size * 10;
    float pred_sense = size * 10;
    // group behaviour (now set as controls)
    //float desired_separation = size * 1.5;
    //float desired_cohesion = size * 5.;
    //float desired_alignment = size * 5.;
    // wind
    float woff = 0.;
    float wincr = 0.01;

    // constructor
    Vehicle(float x, float y) {
        pos = new PVector(x, y);
        vel = new PVector(0, 0);
        acc = new PVector(random(-3, 3), random(-3, 3));
        //maxspeed = 4.;
        //maxsteer = 1.;
    }

    void update() {
        vel.add(acc);
        //vel.limit(maxspeed);
        pos.add(vel);
        acc.mult(0);
    }

    void applyForce(PVector force) {
        acc.add(force);
    }
    
    PVector seek(PVector target) {
       PVector steer = new PVector(0, 0);
       PVector desired = PVector.sub(target, pos);
       desired.setMag(maxspeed);
       steer = PVector.sub(desired, vel);
       steer.limit(maxsteer);
       return steer;
    }

    PVector separate(ArrayList<Vehicle> flock) {
        PVector desired = new PVector();
        PVector steer = new PVector(0, 0);
        int count = 0;
        for (Vehicle v : flock) {
           float dist = PVector.dist(pos, v.pos);
           if ( dist < separation_size & dist > 0) {
              count++;
              PVector diff = PVector.sub(pos, v.pos);
              diff.normalize();
              diff.div(dist); // the closer the further we flee
              desired.add(diff);
           }
        }
        if (count > 0) {
            desired.setMag(maxspeed);
            steer.add(PVector.sub(desired, vel));
           steer.limit(maxsteer);
        }
        return steer;
    }

    PVector align(ArrayList<Vehicle> flock) {
        PVector desired = new PVector(0, 0);
        PVector steer = new PVector(0, 0);
        int count = 0;
        for (Vehicle v : flock) {
           float dist = PVector.dist(pos, v.pos);
           if ( dist < alignment_dist & dist > 0) {
              count++;
              desired.add(v.vel);
           }
        }
        if (count > 0) {
            desired.setMag(maxspeed);
           steer.add(PVector.sub(desired, vel));
           steer.limit(maxsteer);
        }
        return steer;
    }

    PVector cohesion(ArrayList<Vehicle> flock) {
        PVector desired = new PVector(0, 0);
        PVector steer = new PVector(0, 0);
        int count = 0;
        for (Vehicle v : flock) {
           float dist = PVector.dist(pos, v.pos);
           if ( dist < cohesion_size & dist > 0) {
              count++;
              desired.add(v.pos);
           }
        }
        if (count > 0) {
           desired.div(count);
           steer = seek(desired);
        }
        return steer;
    }

    void flocking(ArrayList<Vehicle> flock) {
        PVector sep = separate(flock);
        PVector ali = align(flock);
        PVector coh = cohesion(flock);

        sep.mult(1.9);
        ali.mult(1.1);
        coh.mult(1);

        applyForce(sep);
        applyForce(ali);
        applyForce(coh);
    }

    void fall() {
        applyForce(gravity);
    }

    void feelWind() {
        applyForce(new PVector(2*(noise(woff)-0.5), 0.).mult(gravity.mag() * wind_to_grav));
        woff += wincr;
    }

    void walls() {
        PVector steer;
        PVector desired = new PVector(0, 0);
        boolean atBorder = false;
        if (pos.x < 10) {
            desired.add(new PVector(maxspeed, vel.y)); // speed to the righ, with same vel_y
            atBorder = true;
        }
        if (pos.x > width-10) {
            desired.add(new PVector(-maxspeed, vel.y));
            atBorder = true;
        }
        if (pos.y < 10) {
            desired.add(new PVector(vel.x, maxspeed)); // speed to the righ, with same vel_y
            atBorder = true;
        }
        if (pos.y > height-10) {
            desired.add(new PVector(vel.x, -maxspeed));
            atBorder = true;
        }
        if (atBorder) {
          steer = PVector.sub(desired, vel);
          steer.limit(maxsteer);
          applyForce(steer);
        }
    }

     void run(ArrayList<Vehicle> flock, World env) { // add World env for food
         // flocking behaviour
         flocking(flock);

         // gravity
         //fall();

         // wind?
         //feelWind();

         // target/food
         int i_food = 0;
         ArrayList<Integer> eaten = new ArrayList<Integer>();
         for (PVector tar : env.foods) {
            if (tar.dist(pos) < food_sense) {
              if (tar.dist(pos) < size) {
                // food eaten
                eaten.add(i_food);
              } else {
                PVector steer_food = seek(tar);
                steer_food.limit(maxsteer);
                applyForce(steer_food);
              }
            }
            i_food++;
         }
         // remove eaten:
         for (int i : eaten) {
            env.removeFood(i); 
         }
         
         // walls/edges
         walls();

         // avoid predators
         // target/food
         for (PVector tar : env.predators) {
            if (tar.dist(pos) < pred_sense) {
              PVector steer_food = seek(tar);
              steer_food.mult(-1);
              steer_food.limit(maxsteer);
              applyForce(steer_food);
            }
         }

         // Newton low: accelerate!
         update();
         show();
     }

     void show() {
         fill(0);
         noStroke();
         ellipse(pos.x, pos.y, size, size);
     }
}
public class World {
   ArrayList<PVector> foods;
   ArrayList<PVector> predators;
   
   World() {
      foods = new ArrayList<PVector>();
      predators = new ArrayList<PVector>();
   }
   
   int addFood(float x, float y) {
     foods.add(new PVector(x, y));
     return foods.size()-1;
   }
   
   int addPredator(float x, float y) {
     predators.add(new PVector(x, y));
     return predators.size()-1;
   }
   
   void removeFood(int ind) {
      foods.remove(ind); 
   }
   
   void show() {
      for (PVector f : foods)  {
         fill(0, 200, 0);
         noStroke();
         ellipse(f.x, f.y, 10, 10); 
      }
      for (PVector f : predators) {
         fill(200, 0, 0);
         noStroke();
         ellipse(f.x, f.y, 10, 10); 
      }
   }
}
