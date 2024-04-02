// Initial p5 sketch for this project was co-created with David Brooks
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// https://editor.p5js.org/hannahilea/sketches/AWA1W-c3H

let angle = 0;
let earthSize = 200;
let earthImg;

let mySound;
function preload() {
  soundFormats('mp3');
  mySound = loadSound('world.mp3');
  earthImg = loadImage('earth3.jpeg');
}

function setup() {
  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  c.mousePressed(playPauseSong);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playPauseSong() {
  if (mySound.isPlaying()) {
    mySound.pause();
  } else {
    mySound.play();
  }
}

function draw() {
  // Get our values!
  rate = map(mouseY, 0, height, 0.5, 2);
  let spinAmt;
  if (!mySound.isPlaying()) {
    spinAmt = 0;
  } else if (mouseY < height / 2) {
    spinAmt = map(mouseY, 0, height, 0.001, 0.03, true)
    // console.log(spinAmt);
  } else {
    spinAmt = map(mouseY - height / 2, 0, height, 0.02, 0.5);
  }
  pan = map(mouseX, 0, width, -1., 1.);

  // Draw background gradient
  c1 = color(300);
  let c2 = color(map(pan, -1, 1, 212, 251),
    map(pan, -1, 1, 20, 176),
    map(pan, -1, 1, 90, 51));
  for (let y = -windowHeight / 2; y < windowHeight / 2; y++) {
    n = map(y, -windowHeight / 2, windowHeight / 2, 0, 1);
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
  sphere(earthSize);

  // Update our audio
  mySound.rate(rate);
  mySound.pan(pan);
}
