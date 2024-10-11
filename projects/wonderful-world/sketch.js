// Initial p5 sketch for this project was co-created with David Brooks
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// https://editor.p5js.org/hannahilea/sketches/AWA1W-c3H

let angle = 0;
let earthImg;

let mySound;
function preload() {
  soundFormats('mp3');
  mySound = loadSound('world.mp3');
  earthImg = loadImage('earth.jpg');
}

function setup() {
  let canvasElement = document.getElementById("p5-canvas");
  let c = createCanvas(windowWidth, getCanvasHeight(), WEBGL, canvasElement);
  c.mousePressed(playPauseSong);
}

function getCanvasHeight() {
  return 1 + windowHeight - document.getElementById("project-body").offsetTop;
}

function windowResized() {
  let canvasElement = document.getElementById("p5-canvas");
  resizeCanvas(windowWidth, getCanvasHeight(), canvasElement);
}

function playPauseSong() {
  if (mySound.isPlaying()) {
    mySound.pause();
  } else {
    mySound.play();
  }
}

function draw() {
  let y = Math.max(mouseY, 0);

  // Get our values!
  rate = map(y, 0, height, 0.5, 2);
  let spinAmt;
  if (!mySound.isPlaying()) {
    spinAmt = 0;
  } else if (y < height / 2) {
    spinAmt = map(y, 0, height, 0.001, 0.03, true)
  } else {
    spinAmt = map(y - height / 2, 0, height, 0.02, 0.3);
  }
  pan = map(mouseX, 0, width, -1., 1.);

  // Draw background gradient
  c1 = color(300);
  let c2 = color(map(pan, -1, 1, 212, 251),
    map(pan, -1, 1, 20, 176),
    map(pan, -1, 1, 90, 51));
  for (let y = -height / 2; y < height / 2; y++) {
    n = map(y, -height / 2, height / 2, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(-windowWidth / 2, y, windowWidth / 2, y);
  }

  // Draw stuff
  rotateY(angle);
  lights();
  fill(200);
  noStroke();
  angle += spinAmt;
  texture(earthImg);
  sphere(height * .35);

  // Update audio
  mySound.rate(rate);
  mySound.pan(pan);
}
