let img;
let clr;

function preload() {
  img = loadImage("assets/pic1.jpg");
}

function setup() {
  let canvas = createCanvas(300, 500);
  canvas.parent("p5-canvas-container");
  background(220);

  clr = color(255, 255, 255);
}

function draw() {
  //background(220);
  //image(img, 0, 0, width, height);

  clr = img.get(mouseX, mouseY);

  noStroke();
  fill(clr);
  circle(mouseX, mouseY, 30);
}
