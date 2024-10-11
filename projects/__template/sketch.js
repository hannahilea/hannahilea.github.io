// TODO: edit this blurb!
// Original p5 sketch {{ co-created with FOO+link}}

let mic;

const params = {
  micSensitivity: 4.0,
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
gui.add(params, 'micSensitivity', 0.01, 30, 2);

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  createCanvas(windowWidth, getCanvasHeight(), canvasElement);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function getCanvasHeight() {
  return 1 + windowHeight - document.getElementById("project-body").offsetTop;
}

function windowResized() {
  let canvasElement = document.getElementById("p5-canvas");
  resizeCanvas(windowWidth, getCanvasHeight(), canvasElement);
}

function draw() {
  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();
}
