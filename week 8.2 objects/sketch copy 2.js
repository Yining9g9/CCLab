let creaA, creaB

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  creaA = new Creature(100, 200)
  creaB = new Creature(400, 300)
}

function draw() {
  background(220);

  creaA.display()
  creaB.display()
}

class Creature {
  constructor(tempX, tempY) {
    this.x = tempX
    this.y = tempY
    this.dia = 150
    this.r = random(255)
    this.g = random(255)
    this.b = random(255)
  }
  display() {
    push()
    translate(this.x, this.y)
    fill(this.r, this.g, this.b)
    circle(0, 0, this.dia)

    this.drawArm(30)

    pop()
  }
  drawArm(deg) {
    push()
    rotate(radians(deg))
    ellipse(0, 0, 100, 30)
    pop()

  }

}