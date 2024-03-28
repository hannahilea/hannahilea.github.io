// Co-created by hannahilea (https://hannahilea.github.io/) 
// and hendersonreed (https://hendersonreed.github.io/)
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// Original p5 sketch: https://editor.p5js.org/hannahilea/sketches/Vx6KrBw6-

let mic;
let x;
let y;
let yellowColor;
let isPainting = false;
let currentBrushHeight = 30;

const params = {
  brushHeight: 30,
  yellSensitivity: 0.02,
  maxBrushYJitter: 0.2,
};

const gui = new GUI();
gui.add(params, 'brushHeight', 1, 100, 5);
gui.add(params, 'yellSensitivity', 0.01, 10, .1);
gui.add(params, 'maxBrushYJitter', 0, .6, .1);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);

  // Set up painting canvas
  background("#E8E7D7");

  // ...and palette
  yellowColor = color(255, 204, 0);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background("blue"); //TODO: DELETE
  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel() * 10;
  // console.log(vol);
  if (vol > params.yellSensitivity && !isPainting) {
    // Start a stroke
    x = random(width);
    y = random(height);
    yellowColor = color(255, 204 + random(-10, 100), 0);
    isPainting = true;
    currentBrushHeight = params.brushHeight + random(-1.0, 1.0);
  } else if (vol > params.yellSensitivity && isPainting) {
    // Continuing a stroke

    x -= 0.5;
    y += random(-params.maxBrushYJitter, params.maxBrushYJitter);
  } else if (isPainting) {
    // no noise is happening, stop painting
    isPainting = false;
  }

  if (isPainting) {
    fill(yellowColor);
    noStroke();
    square(x, y, currentBrushHeight, 0);
  }
}
