let bodyPose;
let video;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  bodyPose = ml5.bodyPose();
  video = createCapture(VIDEO);
  video.size(640, 480)
  video.hide()

  bodyPose = ml5.bodyPose();
  bodyPose.detectStart(video, gotResults)
}

function draw() {
  background(220);
}