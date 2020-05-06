let ca;
let history;
let tmp;
let res;
let hist_length;
let current_row = 0;
let run = true;

const N = 400;
const ruleNumber = 90; // 222 Uniformity / 190: repetition / 30: random / 110: complexity (bonus: 90 Serpinksky fractl)
String ruleString;

void setup() {
    size(1600, 900);
    frameRate(40);
    ruleString = ruleToString(ruleNumber);
    res = width/N;
    ca = new CA(N);
    ca.init_middle();
    
    // set history to 0
    hist_length = (int)(height/res);
    history = new boolean[hist_length][ca.size];
    for (int k=0; k<hist_length; k++) {
      for (int i=0; i<ca.size; i++) {
         history[k][i] = false;
      }
   }
   tmp = new boolean[hist_length-1][ca.size];
}

void draw() {  
  background(255);
  // write ruke
  fill(0);
  text(ruleString, 10, 10);
  
  if (run) {  
    // Advance one row
    history[current_row] = ca.states;
    
    // Update state:
    ca.update(ruleNumber);
  }
    
  // Draw current state
  ca.show2D(current_row, history);
    
  if (run) {
    if (current_row < hist_length-1) {
      current_row++;
    } else {
      tmp = Arrays.copyOfRange(history, 1, hist_length);
      //current_row = 0;
      for (int k=0; k < hist_length-1; k++) {
          history[k] = tmp[k];
      }    
    }
  }
}

public String ruleToString(int rule) {
  String binStr ="10100111";
  int startLength = binStr.length();
  for (int i=8; i>startLength; i--) {
     binStr = "0" + binStr; 
  }
   return binStr; 
}

public int boolToInt(boolean b) {
    return b ? 1 : 0;
}

void mouseReleased() {
   run = run ? false : true; 
}
/*
Rules (Wolfram elementary CA):
8-bit int represent a rule, i.e. 8 different neighbour combinations where we have:
        [] [] [] 
        /  |   \
     left  |   right
         current
Each bit is representing the future state ("1" for alive, "0" for dead) of a cell given the configuration:
bit 0: [x][x][x]
bit 1: [x][x][ ]
bit 2: [x][ ][x]
bit 3: [x][ ][ ]
bit 4: [ ][x][x]
bit 5: [ ][x][ ]
bit 6: [ ][ ][x]
bit 7: [ ][ ][ ]

So rule "01011010" would make a cell die in config 0, live in config 1 and so on...
(the above binary string is the representation of the rule 90)
*/

public class CA{

  //params
  int size;
  boolean states[];
  
  // constructor
  CA(int size_) {
     states = new boolean[size_];
     size = size_;
  }
  
  void init_0() {
    for (int i=0; i<size; i++) {
      states[i] = false;
    }
  }
  
  void init_middle() {
    for (int i=0; i<size; i++) {
      states[i] = false;
    }
  states[(int) floor(size/2)] = true;
  }
  
  void init_rdm() {
    for (int i=0; i<size; i++) {
      if (random(1.)<0.5) {
        states[i] = true;
      } else {
        states[i] = false;
      }
    }
  }
  
  void update(int rule) {
     String rulestring = ruleToString(rule);
     boolean[] newstates = new boolean[size];
     for (int i = 1; i<size-1; i++) {
         newstates[i] = applyRule(states[i-1], states[i], states[i+1], rulestring);
     }
     // Wrap edges
     newstates[0] = applyRule(states[size-1], states[0], states[1], rulestring);
     newstates[size-1] = applyRule(states[size-2], states[size-1], states[0], rulestring);
     // Finally swap
     states = newstates;
  }
  
  boolean applyRule(boolean left, boolean middle, boolean right, String rulestring) {
    String s = "" + boolToInt(left) + boolToInt(middle) + boolToInt(right); // quick way to get a string, here we encode the position as binary string like 101 (==5 in decimal)
    int index = parseInt(s, 2);
    return rulestring.charAt(7-index)=='1';
  }
  
  void show1D() {
   return; 
  }
  
  void show2D(int row, boolean [][] history) {
   float scale = width/size;
   fill(0);
   noStroke();
   pushMatrix();
   // Start bottom and scale axis
   //scale(scale, -scale);
   translate(0, -floor(height/scale));
   // Show history below row
   for (int k=row; k>=0; k--) {
      for (int i=0; i<size; i++) {
         if (history[k][i]) {
           rect(i, k, 1, 1);
         }
      }
   }
   // SHpw current state on top
   translate(0, row);
   for (int i=0; i<size; i++) {
      if (states[i]) {
        translate(i, 0);
         rect(0, 0, 1, 1); 
      }
    }
    popMatrix();
  }

}
