let sound;
let amp;

function preload() {
  sound = loadSound("assets/song.mp3")
}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  amp = new p5.Amplitude();

}

function draw() {
  background(220, 10);

  let volume = amp.getLevel()

  let dia = map(volume, 0, 1, 1, 500)

  fill(0)
  circle(width / 2, height / 2, dia)

  let vol = map(mouseY, 0, height, 1.0, 0.1, true)
  sound.setVolume(vol)

  let pan = map(mouseX, 0, width, -1.0, 1.0, true)
  sound.pan(pan)

}

function mousePressed() {
  if (sound.isPlaying() == false) {
    song.loop()
  } else {
    sound.pause()
  }

}