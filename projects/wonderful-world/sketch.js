// Initial p5 sketch for this project was co-created with David Brooks
// as a creative coding project while at the 
// Recurse Center (www.recurse.com/)
// https://editor.p5js.org/hannahilea/sketches/AWA1W-c3H


// let mic;

const params = {
  // micSensitivity: 4.0,
};

const gui = new GUI();
// gui.add(params, 'micSensitivity', 0.01, 30, 2);

// function setup() {
//   createCanvas(windowWidth, windowHeight)

//   // Create an Audio input
//   mic = new p5.AudioIn();

//   // start the Audio Input.
//   // By default, it does not .connect() (to the computer speakers)
//   mic.start();
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function draw() {
//   // https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
//   getAudioContext().resume();
// }


let angle = 0;
let r = 200;
let earth;

let mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('world.mp3');
  earth = loadImage('earth.jpg');
}

function setup() {
  let cnv = createCanvas(500, 500, WEBGL);
  cnv.mousePressed(canvasPressed);
  textAlign(CENTER, CENTER);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
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
  if (mouseY < height/2) {
    spinAmt = map(mouseY, 0, height, 0.001, 0.03, true)
    // console.log(spinAmt);
  } else {
    // spinAmt = map(mouseY, 0, height, 0.02, 0.54, true)
    spinAmt = map(mouseY-height/2, 0, height, 0.02, 0.5);
  }
  pan = map(mouseX, 0, width, -1., 1.);
  
  let c = color(map(pan, -1, 1, 0, 256), 
                map(pan, -1, 1, 256, 0), 
                0);
  
  // Draw stuff
  background(c);
  rotateY(angle);
  lights();
  fill(200);
  noStroke();
  angle += spinAmt;
  texture(earth);
  sphere(r);
  
  // Update our audio
  mySound.rate(rate);
  mySound.pan(pan);
}
