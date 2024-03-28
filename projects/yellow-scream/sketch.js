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
  // margin: 30,
  yellSensitivity: 0.02,
  brushYWiggle: 0.2,
};

const gui = new GUI();
gui.add(params, 'brushHeight', 1, 100, 5);
// gui.add(params, 'margin', 0, 100, 1);
gui.add(params, 'yellSensitivity', 0.01, 10, .1);
gui.add(params, 'brushYWiggle', 0, .6, .1);

function setup() {
  // createCanvas(windowWidth - 2 * params.margin, windowHeight - 2 * params.margin);
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);

  // Set up painting canvas
  background("#515763");
  fill("#E8E7D7");
  // rect(params.margin, params.margin, windowWidth - 2 * params.margin, windowHeight - 2 * params.margin);
  rect(0, 0, windowWidth, windowHeight)

  // ...and pallette
  yellowColor = color(255, 204, 0);

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
  let vol = mic.getLevel() * 10;
  // console.log(vol);
  if (vol > params.yellSensitivity && !isPainting) {
    // Start a stroke
    // x = random(width - 2 * params.margin) + params.margin;
    // y = random(height - 2 * params.margin) + params.margin;
    x = random(width);
    y = random(height);
    yellowColor = color(255, 204 + random(-10, 100), 0);
    isPainting = true;
    currentBrushHeight = params.brushHeight + random(-1.0, 1.0);
  } else if (vol > params.yellSensitivity && isPainting) {
    // Continuing a stroke

    if (x <= params.margin + 0.5) { x = params.margin + 0.5; } else { x -= 0.5; }
    y += random(-params.brushYWiggle, params.brushYWiggle);
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
