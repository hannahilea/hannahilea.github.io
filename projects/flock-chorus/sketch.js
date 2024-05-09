// Built off of p5 flocking demo sketch https://p5js.org/examples/simulate-flocking.html

let mic;

const params = {
  micSensitivity: 4.0,
};

const gui = new GUI();
gui.add(params, 'micSensitivity', 0.01, 30, 2);

function setup() {
  createCanvas(windowWidth, windowHeight)

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();
}
