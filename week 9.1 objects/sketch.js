let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 50; i++) {
    let x = random(width)
    let y = random(300, 350)
    let dia = random(10, 20)
    let newP = new Particle(x, y, dia)
    particles.push(newP)
  }
}

function draw() {
  background(220);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.reappear();
    p.display();
  }
}

class Particle {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.xSpeed = 0
    this.ySpeed = random(-3, -1)
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  reappear() {
    if (this.y < -50) {
      this.y = height + 50
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);


    pop()
  }
}