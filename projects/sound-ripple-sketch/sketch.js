// Original p5 sketch co-created with hendersonreed (https://hendersonreed.github.io/)
// https://editor.p5js.org/hannahilea/sketches/Vx6KrBw6-
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)

let mic;
let livingParticles = [];
let bUserHasInteracted = false;

const params = {
  micSensitivity: 6.0,
  mode: 'ripple',
  backgroundColor: "darkblue",
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
gui.add(params, 'micSensitivity', 0.01, 30, 2);
gui.add(params, "mode", ['ripple', 'x', 'burst', 'diagonal']);
gui.addColor(params, "backgroundColor");

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  createCanvas(windowWidth, getCanvasHeight(), canvasElement)
  colorMode(HSL, 1.0);

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

function spawnParticles(volume) {
  let x = bUserHasInteracted ? Math.max(mouseX, 0) : width / 2;
  let y = bUserHasInteracted ? Math.max(mouseY, 0) : height / 2;

  let numParticles = volume * 100;
  for (let i = 0; i < numParticles; i++) {
    let particle = { x: x, y: y, energy: volume, life: volume * 8.0 };
    let d;
    switch (params.mode) {
      case 'burst':
        particle.dX = random(-1.0, 1.0);
        particle.dY = random(-1.0, 1.0);
        break;
      case 'diagonal':
        // Funky 1d diagonal lines
        d = random(-1.0, 1.0);
        particle.dX = d;
        particle.dY = d;
        break;
      case 'x':
        // Funky x's
        d = random(-1.0, 1.0);
        particle.dX = random([-1, 1]) * d;
        particle.dY = random([-1, 1]) * d;
        break;
      case 'ripple':
        // Circular rings! Like water drops
        d = random(0, 2 * PI);
        particle.dX = random([-1, 1]) * cos(d);
        particle.dY = random([-1, 1]) * sin(d);
        break;
    };
    livingParticles.push(particle);
  };
}

function draw() {
  if (!bUserHasInteracted && (mouseX != 0 || mouseY != 0)) {
    bUserHasInteracted = true;
  }
  background(params.backgroundColor);

  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel() * params.micSensitivity;
  if (vol > 0.04) {
    spawnParticles(vol);
  }

  livingParticles = livingParticles.filter((p) => {
    return p.life > 0;
  });

  livingParticles.forEach((p) => {
    fill(p.energy, 0.75, 0.5);
    noStroke();
    ellipse(p.x + p.dX, p.y + p.dY, p.life * 5, p.life * 5);
    p.x += p.dX;
    p.y += p.dY;
    p.life -= .005;
  });
}
