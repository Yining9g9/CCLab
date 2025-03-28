let sound;

function preload() {
  sound = loadSound("assets/sounds/kick.mp3")
}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(220);

  let vol = map(mouseY, 0, height, 1.0, 0.1, true)
  sound.setVolume(vol)

  let pan = map(mouseX, 0, width, -1.0, 1.0, true)
  sound.pan(pan)

}

function mousePressed() {
  if (sound.isPlaying) {
    sound.pause()
  } else {
    sound.play()
  }

}