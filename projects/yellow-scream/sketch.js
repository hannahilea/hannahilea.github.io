// Created by hannahilea (https://hannahilea.github.io/) 
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// Original p5 sketch: https://editor.p5js.org/hannahilea/sketches/iJpZMXe8X

let mic;
let x;
let y;
let yellowColor;
let isPainting = false;
let currentbrushWidth;

const params = {
  brushSpeed: 1.5,
  screamThreshold: 10,
  brushWidth: 80,
  maxBrushYJitter: 0.2,
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
gui.add(params, 'screamThreshold', 0, 300, 5);
gui.add(params, 'brushSpeed', 0.1, 5, 1);
gui.add(params, 'brushWidth', 1, 100, 5);
gui.add(params, 'maxBrushYJitter', 0, .6, .1);

function setup() {
  let availableHeight = 1 + windowHeight - document.getElementById("project-body").offsetTop;
  let canvasElement = document.getElementById("p5-canvas");
  createCanvas(windowWidth, availableHeight, canvasElement);
  colorMode(RGB, 255);

  // Set up painting canvas
  background("#E8E7D7");

  // ...and studio:
  yellowColor = color(255, 204, 0);
  // params.brushWidth = windowHeight/10;

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  // console.log(windowHeight / 10)
}

function draw() {
  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel() * 1000;
  // console.log(vol);
  if (vol > params.screamThreshold && !isPainting) {
    // Start a stroke
    x = random(width);
    y = random(height);
    yellowColor = color(255, 204 + random(-10, 100), 0);
    isPainting = true;
    currentbrushWidth = params.brushWidth + random(-1.0, 1.0);
  } else if (vol > params.screamThreshold && isPainting) {
    // Continuing a stroke

    x -= params.brushSpeed;
    y += random(-params.maxBrushYJitter, params.maxBrushYJitter);
  } else if (isPainting) {
    // no noise is happening, stop painting
    isPainting = false;
  }

  if (isPainting) {
    fill(yellowColor);
    noStroke();
    square(x, y, currentbrushWidth, 0);
  }
}
