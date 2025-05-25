// TODO: edit this blurb!
// Original p5 sketch https://editor.p5js.org/hannahilea/sketches/gVy8QHQkv

const params = {
  // micSensitivity: 4.0, #TODO REPLACE
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
// gui.add(params, 'micSensitivity', 0.01, 30, 2); #TODO

let mobiles = []
// let colors = ['red', 'yellow', 'yellow', 'blue', 'blue', 'blue']
let colors = ['DeepSkyBlue', 'MediumBlue', 'MediumBlue', 'MediumBlue', 'gold', 'goldenRod']

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  createCanvas(windowWidth, getCanvasHeight(), WEBGL, canvasElement);
  
  let s = new Mobile(0);
  fillMobile(s);
  mobiles.push(s);
}

function getCanvasHeight() {
  return 1 + windowHeight - document.getElementById("project-body").offsetTop;
}

function windowResized() {
  let canvasElement = document.getElementById("p5-canvas");
  resizeCanvas(windowWidth, getCanvasHeight(), canvasElement);

  for (let i = 0; i < mobiles.length; i++) {
     fillMobile(mobiles[i]) 
  }
}

function draw() {
  background('linen');
  for (let i = 0; i < mobiles.length; i++) {
    drawMobile(mobiles[i]);
  }
}

function mouseClicked() {
  console.log(mouseX);
  let s = new Mobile(mouseX - windowWidth/2);
  fillMobile(s);
  mobiles.push(s);
}

function doubleClicked() {
  mobiles = [];
}

function Mobile(x) {
  this.pieces = [];
  this.x = x;
  this.yEmpty = random(8, 14);
}

function fillMobile(mobile) {
  while (mobile.yEmpty < windowWidth) {
    if (random(1, 10) > 0) {
      addCircle(mobile, random(20, 50), random(colors));
    } else {
      addConcentric(mobile, random(20, 50), random(colors), random(colors));
    }
  }
}

function addCircle(mobile, radius, colorFill) {
  // console.log("CIRCLE!")
  mobile.pieces.push(new Piece(mobile.yEmpty + radius, radius, colorFill, 0))
  mobile.yEmpty += 2 * radius;
  mobile.yEmpty += random(10, 20);
}

function addConcentric(mobile, radius, colorFillOuter, colorFillInner) {
  // console.log("CONCENTRIC!")
  mobile.pieces.push(new Piece(mobile.yEmpty + radius, radius, colorFillOuter, 2 + radius/2))
  mobile.pieces.push(new Piece(mobile.yEmpty + radius, -2 + radius/2, colorFillInner, 0))
  mobile.yEmpty += 2 * radius;
  mobile.yEmpty += random(10, 20);
}

function Piece(yCenter, radius, colorFill, innerRadius) {
  this.yCenter = yCenter;
  this.radius = radius;
  this.colorFill = colorFill;
  this.innerRadius = innerRadius
  this.rotateRatio = random(0.001, 0.01)
}

function drawMobile(mobile) {
  stroke('navy');
  line(mobile.x, -windowHeight/2, mobile.x, windowHeight/2);
  noStroke();
  
  for (let i = 0; i < mobile.pieces.length; i++) {
    let p = mobile.pieces[i];
    // console.log(p)
    
    push();
    translate(mobile.x, 0);
    rotateY(frameCount * p.rotateRatio);
    if (p.innerRadius > 0) {
      beginClip({ invert: true })
      circle(0, p.yCenter - windowHeight/2, p.innerRadius * 2);
      endClip()
    }
    fill(p.colorFill)
    circle(0, p.yCenter - windowHeight/2, p.radius * 2);
    
    pop();
  }
}
