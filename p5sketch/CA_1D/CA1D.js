let ca;
let history;
let tmp;
let res;
let hist_length;
let current_row = 0;
let run = true;
let ruleinput;
let updatebtn;

const N = 250;
let ruleNumber = 90; // 222 Uniformity / 190: repetition / 30: random / 110: complexity (bonus: 90 Serpinksky fractl)
let ruleString;

function setup() {
    createCanvas(800, 500);
    //frameRate(40);
    ruleString = ruleToString(ruleNumber);
    res = width/N;
    ca = new CA(N);
    ca.init_middle();
    
    // set history to 0
    hist_length = int(height/res);
    history = make2DArray(hist_length, ca.size);
    for (var k=0; k<hist_length; k++) {
      for (var i=0; i<ca.size; i++) {
         history[k][i] = false;
      }
   }
   tmp = make2DArray(hist_length-1, ca.size);
   
   ruleinput = createInput('90');
   updatebtn = createButton("Update");
   updatebtn.mousePressed(switchRule);
   
}

function draw() {  
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
      //tmp = Arrays.copyOfRange(history, 1, hist_length);
      tmp = history.slice(1, hist_length);
      //current_row = 0;
      for (var k=0; k < hist_length-1; k++) {
          history[k] = tmp[k];
      }    
    }
  }
}

function switchRule() {
    ruleNumber = parseInt(ruleinput.value());
    ruleString = ruleToString(ruleNumber);
    current_row = 0;
    ca.init_middle();
    history = make2DArray(hist_length, ca.size);
    for (var k=0; k<hist_length; k++) {
      for (var i=0; i<ca.size; i++) {
         history[k][i] = false;
      }
   }
}

function make2DArray(rows, cols) {
    let out = new Array(rows);
    for (var i=0; i<rows; i++) {
        out[i] = new Array(cols);
        for (var j=0; j<cols; j++) {
            out[i][j] = 0;
        }
    }
    return out
}

function ruleToString(rule) {
  return rule.toString(2).padStart(8, 0);
}

function boolToInt(b) {
    return b ? 1 : 0;
}

function mouseReleased() {
    if (mouseX < width & mouseY < height & mouseY>=0 & mouseX>=0)
    {run = run ? false : true; }
}
