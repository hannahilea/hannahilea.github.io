// Original p5 sketch co-created with hendersonreed (https://hendersonreed.github.io/)
// https://editor.p5js.org/hannahilea/sketches/Vx6KrBw6-
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)

let mic;
let livingParticles = [];

const params = {
  micSensitivity: 4.0,
  mode: 'ripple',
  backgroundColor: "darkblue",
};

const gui = new GUI();
gui.add(params, 'micSensitivity', 0.01, 30, 2);
gui.add(params, "mode", ['ripple', 'x', 'burst', 'diagonal']);
gui.addColor(params, "backgroundColor");

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSL, 1.0);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function spawnParticles(volume) {
  let numParticles = volume * 100;
  for (let i = 0; i < numParticles; i++) {
    let particle = { x: mouseX, y: mouseY, energy: volume, life: volume * 8.0 };
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
  background(params.backgroundColor);

  // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
  getAudioContext().resume();

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel() * params.micSensitivity;
  if (vol > 0.04) {
    spawnParticles(vol);
  }

  if (true) {
    livingParticles = livingParticles.filter((p) => {
      return p.life > 0;
    });
  }

  livingParticles.forEach((p) => {
    fill(p.energy, 0.75, 0.5);
    noStroke();
    ellipse(p.x + p.dX, p.y + p.dY, p.life * 5, p.life * 5);
    p.x += p.dX;
    p.y += p.dY;
    p.life -= .005;
  });
}
