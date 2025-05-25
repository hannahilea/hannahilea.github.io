// Original p5 sketch https://editor.p5js.org/hannahilea/sketches/gVy8QHQkv

const params = {
  windRatio: 1.0,
  concentricRatio: 30,
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
gui.add(params, 'windRatio', 0.01, 10.0, .1).name("Base wind speed");
gui.add(params, 'concentricRatio', 0, 100, 1).name("% Concentric Circles");

let strands = []
// let colors = ['red', 'yellow', 'yellow', 'blue', 'blue', 'blue']
let colors = ['DeepSkyBlue', 'MediumBlue', 'MediumBlue', 'MediumBlue', 'gold', 'goldenRod']
let mouseSpeedRatio = 1;

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  createCanvas(windowWidth, calculateCanvasHeight(), WEBGL, canvasElement);
  
  let s = new Strand(0);
  fillStrand(s);
  strands.push(s);
}

function calculateCanvasHeight() {
  return windowHeight - document.getElementById("project-body").offsetTop;
}

function calculateCanvasYOffset() {
  elem = document.getElementById("project-header");
  return parseInt(elem.offsetHeight) + parseInt(elem.offsetTop)
}

function windowResized() {
  let canvasElement = document.getElementById("p5-canvas");
  resizeCanvas(windowWidth, calculateCanvasHeight(), canvasElement);

  for (let i = 0; i < strands.length; i++) {
     fillStrand(strands[i]) 
  }
}

function draw() {
  background('linen');
  for (let i = 0; i < strands.length; i++) {
    drawStrand(strands[i]);
  }
}

function mouseClicked(event) {
  let overCanvas = event.clientY > calculateCanvasYOffset();
  if (overCanvas) {
    let s = new Strand(mouseX - windowWidth/2);
    fillStrand(s);
    strands.push(s);
  }
}

function doubleClicked(event) {
  let overCanvas = event.clientY > calculateCanvasYOffset();
  if (overCanvas) {
    strands = []; // Clear strands
  }
}

function mouseMoved() {
  let overCanvas = event.clientY > calculateCanvasYOffset();
  if (overCanvas) {
    let mousePos = mouseX - windowWidth/2;
    for (let i = 0; i < strands.length; i++) {
      if (abs(strands[i].x - mousePos) < 75) {
        strands[i].windRatio += .01;
      }
    }
  }
}

function Strand(x) {
  this.pieces = [];
  this.x = x;
  this.yEmpty = random(8, 14);
  this.windRatio = 1;
}

function fillStrand(strand) {
  while (strand.yEmpty < calculateCanvasHeight()) {
    if (random(1, 100) > params.concentricRatio) {
      addCircle(strand, random(20, 50), random(colors));
    } else {
      addConcentric(strand, random(20, 50), random(colors), random(colors));
    }
  }
}

function addCircle(strand, radius, colorFill) {
  console.log("CIRCLE!")
  strand.pieces.push(new Piece(strand.yEmpty + radius, radius, colorFill, 0))
  strand.yEmpty += 2 * radius;
  strand.yEmpty += random(10, 20);
}

function addConcentric(strand, radius, colorFillOuter, colorFillInner) {
  console.log("CONCENTRIC!")
  strand.pieces.push(new Piece(strand.yEmpty + radius, radius, colorFillOuter, 2 + radius/2))
  strand.pieces.push(new Piece(strand.yEmpty + radius, -2 + radius/2, colorFillInner, 0))
  strand.yEmpty += 2 * radius;
  strand.yEmpty += random(10, 20);
}

function Piece(yCenter, radius, colorFill, innerRadius) {
  this.yCenter = yCenter;
  this.radius = radius;
  this.colorFill = colorFill;
  this.innerRadius = innerRadius
  this.rotateRatio = random(0.001, 0.01)
}

function drawStrand(strand) {
  stroke('navy');
  line(strand.x, -windowHeight/2, strand.x, windowHeight/2);
  noStroke();
  
  for (let i = 0; i < strand.pieces.length; i++) {
    let p = strand.pieces[i];
    // console.log(p)
    
    push();
    translate(strand.x, 0);
    rotateY(frameCount * p.rotateRatio * strand.windRatio * params.windRatio);
    if (p.innerRadius > 0) {
      beginClip({ invert: true })
      circle(0, p.yCenter - windowHeight/2, p.innerRadius * 2);
      endClip()
    }
    fill(p.colorFill)
    circle(0, p.yCenter - windowHeight/2, p.radius * 2);
    
    pop();
  }
  if (strand.windRatio > 1) {
    strand.windRatio -= .0001;
  }
}
