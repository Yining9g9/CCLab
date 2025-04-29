let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(-50, 0);

    let newP = new Particle(x, y);
    particles.push(newP);
  }
}

function draw() {
  background(0, 100);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.reappear();

  }

}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.y += 3
    this.movementState = false;
    this.movement = 0;
    this.movementTarget = 0;
  }
  update() {
    this.y += 3;
    this.updateMovement();
  }
  updateMovement() {
    let remainder = frameCount % 30;
    if (remainder == 0) {
      this.movementState = !this.movementState;
    }
    if (this.movementState == true) {
      this.movementTarget += -1;
    } else {
      this.movementTarget += 1;
    }

    this.movement = lerp(this.movement, this.movementTarget, 0.35);

  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(-5 * this.x, 5 * this.x)

    this.drawPaper(this.movement)

    pop();
  }
  drawPaper(movement) {
    textSize(50)
    text("📜", movement, 0)
  }
  reappear() {
    if (this.y < -50) {
      this.y = height + 50;
    }
    else if (this.y > height + 50) {
      this.y = - 50;
    }
  }
}