// Co-created by hannahilea (https://hannahilea.github.io/) 
// and hendersonreed (https://hendersonreed.github.io/)
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// Original p5 sketch: https://editor.p5js.org/hannahilea/sketches/Vx6KrBw6-

let mic;
let x;
let y;
let yellowColor;
let brushHeight;
let isPainting;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  background("white");
  isPainting = false;
  yellowColor = color(255, 204, 0);
  brushHeight = 30;

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  let yellThreshold = 0.02;
  if (vol > yellThreshold && !isPainting) {
    // Start a stroke
    x = random(width);
    y = random(height);
    yellowColor = color(255, 204 + random(-10, 100), 0);
    isPainting = true;
    brushHeight = 30 + random(-1.0, 1.0);
  } else if (vol > yellThreshold && isPainting) {
    // Continuing a stroke
    x -= 0.5;
  } else if (isPainting) {
    // no noise is happening, stop painting
    isPainting = false;
  }

  if (isPainting) {
    fill(yellowColor);
    noStroke();
    square(x, y, brushHeight, 0);
  }
}
