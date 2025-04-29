let img;
let clr;

function preload() {
  img = loadImage("assets/DSCF4238.JPG");
}

function setup() {
  let canvas = createCanvas(386, 217);
  canvas.parent("p5-canvas-container");

  background(255);
}

function draw() {
  //background(220);
  //imageMode(CENTER)



  //tint(0, 100, 100)
  //image(img, 0, 0, width, height);
  //filter()
  for (i = 0; i < 50; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    clr = img.get(x, y)

    noStroke()
    fill(clr)
    circle(x, y, random(3, 7))
  }
}