let cam;


function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");


  cam = createCapture(VIDEO);
  cam.hide();


  background(255);
}


function draw() {
  background(0);


  //let gridSize = floor(map(mouseX, 0, width, 5, 80, true));
  let gridSize = 10;
  cam.loadPixels();
  for (let y = 0; y < cam.height; y += gridSize) {
    for (let x = 0; x < cam.width; x += gridSize) {


      let index = (x + y * cam.width) * 4; // ***


      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];


      let avg = (r + g + b) / 3; // brightness
      let dia = map(avg, 0, 255, 1, gridSize);


      push();
      translate(x + gridSize / 2, y + gridSize / 2);


      noStroke();
      fill(255);
      circle(0, 0, dia);


      pop();


    }
  }
}
