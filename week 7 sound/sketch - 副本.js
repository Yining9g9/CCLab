let mic;

function preload() {

}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  angleMode(DEGREE)

  mic = new p5.AudioIn()
  mic.start()
  let x = width / 2
  let y = height / 2
}

function draw() {
  background(220);

  let volume = mic.getLevel()
  //let dia=map(volume,0,1,1,500)

  angle += volume
  let radDist = 200;
  let x = x + cos(angle) * radDist
  let y = y + sin(angle) * radDist
  translate(width / 2, height / 2)
  circle(x, y, 50)

}

function mousePressed() {


}