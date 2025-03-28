let result;
let colorNames = [red, green, yellow, blue]

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(220);

  for (let i = 0; i < colorNames.length; i++) {
    let name = colorNames[i]
    letx = 20
    y = i * 100 + 30

    fill(name)
    noStroke()
    rect(0, y, width, 100)

    fill(255)
    text(name, x, y + 30)


  }

}