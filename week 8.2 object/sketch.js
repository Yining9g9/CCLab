let creature = []

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 500; i++) {
    creature[i] = new Creature(random(0, width), random(0, height))
  }
}

function draw() {
  background(220);

  for (let i = 0; i < 500; i++) {
    let c = creature[i]
    c.display()
  }
}

class Creature {
  constructor(tempX, tempY) {
    this.x = tempX
    this.y = tempY
    this.dia = 50
    this.r = random(255)
    this.g = random(255)
    this.b = random(255)
  }
  display() {
    push()
    translate(this.x, this.y)
    noStroke()
    fill(this.r, this.g, this.b)
    circle(0, 0, this.dia)

    this.drawArm(30)

    pop()
  }
  drawArm(deg) {
    push()
    rotate(radians(deg))
    noStroke()
    ellipse(0, 0, 100, 30)
    pop()

  }

}