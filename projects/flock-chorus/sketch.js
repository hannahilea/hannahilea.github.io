// Built off of p5 flocking demo sketch https://p5js.org/examples/simulate-flocking.html
console.log("Access to tone module?", Tone)
let flock;

const params = {
  worldWraps: false,
  maxspeed: 2,
  maxforce: 0.05, // Maximum steering force
  radius: 3,
  targetFreqHz: 440,
  maxStartOffsetHz: 100,
  volume: -40,
  freqIncrement: .9,
};

// Set up param gui
const GUI = lil.GUI;
const gui = new GUI({ autoPlace: false }).title("Parameters");
gui.domElement.id = 'gui';
document.getElementById("gui-container").appendChild(gui.domElement);
gui.open(false);

// Add params to param gui
gui.add(params, 'worldWraps').name("Wrap world");
const guiFolder = gui.addFolder('New boid spawn settings');
guiFolder.add(params, 'targetFreqHz', 125, 2350, 5).name("Target pitch (Hz)");
guiFolder.add(params, 'freqIncrement', 0.1, 1.5, .1).name("Pitch converge speed");
guiFolder.add(params, 'maxStartOffsetHz', 0, 600, 50).name("Start pitch max offset (Hz)");

// These are nice for development but do not maximize fun
// guiFolder.add(params, 'maxspeed', 0, 8, .5).name("Max speed");
// guiFolder.add(params, 'maxforce', 0, .1, .01).name("Max steering force");
// guiFolder.add(params, 'radius', .1, 10, .3).name("Size");
// guiFolder.add(params, 'volume', -80, -12, 1).name("Volume");

function calculateCanvasHeight() {
  return windowHeight - document.getElementById("project-body").offsetTop;
}

function calculateCanvasYOffset() {
  elem = document.getElementById("project-header");
  return parseInt(elem.offsetHeight) + parseInt(elem.offsetTop)
}

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  let canvas = createCanvas(windowWidth, calculateCanvasHeight(), canvasElement)
  canvas.mouseClicked(mouseClickedOnCanvas)
  Tone.start();
  flock = new Flock(); // Empty flock!
}

function windowResized() {
  let canvasElement = document.getElementById("p5-canvas");
  resizeCanvas(windowWidth, calculateCanvasHeight(), canvasElement);
}

function draw() {
  // Draw background sky gradient
  let c2 = color(156, 186, 230);
  let c1 = color(229, 250, 280);
  for (let y = 0; y <= windowHeight; y++) {
    let newc = lerpColor(c1, c2, map(y, 0, windowHeight, 0, 1));
    stroke(newc);
    line(0, y, windowWidth, y);
  }

  flock.run();
}

// Add new boids into the System
function mouseDragged(event) {
  let overCanvas = event.clientY > calculateCanvasYOffset();
  let elem = document.getElementById("gui");
  let guiY = (parseInt(elem.offsetHeight) + parseInt(elem.offsetTop));
  let guiX = (parseInt(elem.offsetWidth) + parseInt(elem.offsetLeft));

  // If not over the canvas, ignore
  // If over the GUI, ignore 
  if (event.clientY > guiY && event.clientX < guiX && overCanvas) {
    console.log("we did it, joe");
    flock.addBoid(new Boid(mouseX, mouseY));
  }
}

// Add a new boid into the System
function mouseClickedOnCanvas() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function () {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
  if (!params.worldWraps) {
    // If the world doesn't wrap, remove all boids that have flown off screen
    this.boids = this.boids.filter((b) => {
      let isOnScreen = b.position.x <= windowWidth && b.position.x >= 0 && b.position.y <= windowHeight && b.position.y >= 0;
      if (!isOnScreen) {
        // Fade out the synth before the boid is killed (in theory, might actually get destroyed sooner than the oscillator stops....)
        b.oscillator.stop("+1.2");
        b.oscillator.volume.rampTo(-Infinity, 1);
      }
      return isOnScreen;
    });
  }
}

Flock.prototype.addBoid = function (b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1) * params.maxspeed, random(-1, 1) * params.maxspeed);
  this.position = createVector(x, y);
  this.r = params.radius;
  this.maxspeed = params.maxspeed;    // Maximum speed
  this.maxforce = params.maxforce;    // Maximum steering force
  this.targetFreqHz = params.targetFreqHz;
  this.currentFreqHz = this.targetFreqHz + ((Math.random() - 0.5) * params.maxStartOffsetHz);
  this.freqIncrement = params.freqIncrement;

  // Set up sound
  this.oscillator = new Tone.Oscillator({
    frequency: this.currentFreqHz,
    type: "sawtooth4",
    volume: params.volume,
    detune: Math.random() * 30 - 15,
  });
  this.panner = new Tone.Panner(getPanFromX(x)).toDestination();

  // Start playing on spawn
  this.oscillator.connect(this.panner).start();
}

function getPanFromX(x) {
  let p = map(x, 0, windowWidth, -1, 1);
  p = p < -1 ? -1 : p;
  p = p > 1 ? 1 : p;
  return p
}

Boid.prototype.run = function (boids) {
  this.flock(boids);
  this.update();
  this.panner.pan.value = getPanFromX(this.position.x);
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function (force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function (boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function () {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function () {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  fill("#090979");
  stroke("#8484c3");
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(0, this.r * 1);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function (boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
    let currentFreq = this.oscillator.frequency.value;
    let diffFreq = this.targetFreqHz - currentFreq;
    if (Math.abs(diffFreq) > this.freqIncrement) {
      let newFreq = currentFreq + Math.sign(diffFreq) * this.freqIncrement;
      this.oscillator.frequency.value = newFreq;
    } else {
      this.oscillator.frequency.value = this.targetFreqHz;
    }
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }

  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
