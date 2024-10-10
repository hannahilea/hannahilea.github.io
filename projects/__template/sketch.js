// TODO: edit this blurb!
// Original p5 sketch {{ co-created with FOO+link}}

let mic;

const params = {
  micSensitivity: 4.0,
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI( { autoPlace: false} ).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);

// Add params to param gui
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
