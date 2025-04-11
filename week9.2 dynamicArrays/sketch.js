let particles = []

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");



}

function draw() {
  background(220);


  particles.push(new Particle(mouseX, mouseY, random(5, 15)));


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.age();
    p.checkOutOfCanvas();
    p.display();

  }

  for (let i = particles.length - 1; i >= 0; i--) {

    let p = particles[i];
    if (p.isDone) {
      particles.splice(i, 1)
    }
  }

  while (particles.length > 500) {
    particles.splice(0, 1);
  }
}

class Particle {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);

    this.lifespan = 1.0
    this.isDone = false
  }
  move() {
    this.x += this.xSpeed
    this.y += this.ySpeed
  }
  age() {
    this.lifespan -= 0.01;
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isDone = true
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    circle(0, 0, this.dia);

    pop();
  }
}