class CA{
  
  // constructor
  constructor(size_) {
     this.states = new Array(size_);
     this.size = size_;
  }
  
  init_0() {
    for (var i=0; i<this.size; i++) {
      this.states[i] = false;
    }
  }
  
  init_middle() {
    for (var i=0; i<this.size; i++) {
      this.states[i] = false;
    }
  states[(int) floor(size/2)] = true;
  }
  
  init_rdm() {
    for (var i=0; i<this.size; i++) {
      if (random(1.)<0.5) {
        this.states[i] = true;
      } else {
        this.states[i] = false;
      }
    }
  }
  
  update(rule) {
     let rulestring = ruleToString(rule);
     let newstates = new Array(this.size);
     for (var i = 1; i<this.size-1; i++) {
         newstates[i] = applyRule(this.states[i-1],this.states[i], this.states[i+1], rulestring);
     }
     // Wrap edges
     newstates[0] = applyRule(this.states[size-1], this.states[0], this.states[1], rulestring);
     newstates[size-1] = applyRule(this.states[size-2], this.states[size-1], this.states[0], rulestring);
     // Finally swap
     this.states = newstates;
  }
  
  applyRule(left, middle, right, rulestring) {
    let s = "" + boolToInt(left) + boolToInt(middle) + boolToInt(right); // quick way to get a string, here we encode the position as binary string like 101 (==5 in decimal)
    let index = parseInt(s, 2);
    return rulestring.charAt(7-index)=='1';
  }
  
  show1D() {
   return; 
  }
  
  show2D(row, history) {
   let scale = width/size;
   fill(0);
   noStroke();
   push();
   // Start bottom and scale axis
   //scale(scale, -scale);
   translate(0, -floor(height/scale));
   // Show history below row
   for (var k=row; k>=0; k--) {
      for (var i=0; i<this.size; i++) {
         if (history[k][i]) {
           rect(i, k, 1, 1);
         }
      }
   }
   // SHpw current state on top
   translate(0, row);
   for (var i=0; i<this.size; i++) {
      if (this.states[i]) {
        translate(i, 0);
         rect(0, 0, 1, 1); 
      }
    }
    pop();
  }

}
