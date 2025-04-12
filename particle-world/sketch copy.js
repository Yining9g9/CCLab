let particles = [];
let trees = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


}

function draw() {
  background(100, 180, 150);

  for (i = 0; i < 30; i++) {
    let x0 = width - i * 2;
    let y0 = 10 + random(-15, 15);
    let xSpeed0 = random(-5, -3);
    let freq0 = frameCount

    let x01 = width * 7 / 8 + i * 0.7;
    let y01 = 70 + random(-10, 10);

    let x02 = width - 50 - i * 0.1;
    let y02 = 100 + random(-10, 10);

    let x03 = width * 7 / 8 + i * 0.7;
    let y03 = 130 + random(-10, 10);

    let x1 = width * 5 / 8 + i * 5;
    let y1 = height / 2 + random(-15, 15);
    let xSpeed1 = random(-7, -5);
    let freq1 = frameCount

    let x11 = width * 4 / 5 + i * 5;
    let y11 = height * 3 / 7 + random(-15, 15);

    let x12 = width * 4 / 5 + i * 5;
    let y12 = height * 4 / 7 + random(-15, 15);

    let x2 = width * 3 / 7 + i * 10;
    let y2 = height * 4 / 5 + random(-15, 15);
    let xSpeed2 = random(-10, -7);
    let freq2 = frameCount

    let x21 = width * 7 / 10 + i * 10;
    let y21 = height * 5 / 7 + random(-15, 15);

    let dia = random(3, 5)

    particles.push(new Particle(x0, y0, dia, xSpeed0, freq0, 8));
    particles.push(new Particle(x01, y01, dia, xSpeed0, freq0, 8));
    particles.push(new Particle(x02, y02, dia, xSpeed0, freq0, 8));
    particles.push(new Particle(x03, y03, dia, xSpeed0, freq0, 8));
    particles.push(new Particle(x1, y1, dia, xSpeed1, freq1, 3));
    particles.push(new Particle(x11, y11, dia, xSpeed1, freq1, 3));
    particles.push(new Particle(x12, y12, dia, xSpeed1, freq1, 3));
    particles.push(new Particle(x2, y2, dia, xSpeed2, freq2, 3));
    particles.push(new Particle(x21, y21, dia, xSpeed2, freq2, 3));

  }

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

  while (particles.length > 2000) {
    particles.splice(0, 270);
  }

  for (i = 0; i < 2; i++) {
    trees.push(new Tree(70 - 30 * i, 70 + 100 * i, 5));
    trees.push(new Tree(80 - 30 * i, 30 + 100 * i, 5));
    trees.push(new Tree(90 - 30 * i, 20 + 100 * i, 5));
    trees.push(new Tree(120 - 30 * i, 50 + 100 * i, 5));
    trees.push(new Tree(120 - 30 * i, 100 + 100 * i, 5));
    trees.push(new Tree(130 - 30 * i, 30 + 100 * i, 5));
    trees.push(new Tree(150 - 30 * i, 20 + 100 * i, 5));
  }

  for (let i = 0; i < trees.length; i++) {
    let t = trees[i];
    t.move();
    t.age();
    t.display();
  }

  while (trees.length > 800) {
    trees.splice(0, 14);
  }

  text(particles.length, 10, 20);
  text(frameRate(), 10, 30);
  text(trees.length, 10, 40);

}

class Particle {
  constructor(startX, startY, dia, xSpeed, freq, yI) {
    this.x = startX;
    this.y = startY;
    this.dia = dia;
    this.freq = freq;
    this.xSpeed = xSpeed;
    this.yI = yI
    this.ySpeed = this.yI + sin(freq) * 2 + noise(freq) * 7;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.lifespan = 1.0
    this.isDone = false
  }
  move() {
    this.x += this.xSpeed
    this.y += this.ySpeed
  }
  age() {
    this.lifespan -= 0.03;
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

    noStroke()
    fill(this.r, this.g, this.b, 255 * this.lifespan);
    circle(0, 0, this.dia * this.lifespan);

    pop();
  }
}

class Tree {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.xSpeed = 5
    this.ySpeed = 7 + sin(frameCount * 0.05) * 1
    this.lifespan = 1.0
    this.isDone = false
  }
  move() {
    this.x += this.xSpeed
    this.y += this.ySpeed
  }

  age() {
    this.lifespan -= 0.015;
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(100, 150, 100, 255 * this.lifespan);
    circle(0, 0, this.dia * this.lifespan);

    pop();
  }
}