let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new YiningDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();

  dancer.update();
  dancer.display();
}

class YiningDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.movementState = false;
    this.movement = 0;
    this.movementTarget = 0;
  }
  update() {
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
    this.drawBody(this.movement);
    this.drawEyes(this.movement);
    this.drawFeet(this.movement);
    this.drawHands(this.movement);
    pop();
  }

  drawBody(body) {
    noStroke();
    fill(201, 142, 104);
    ellipse(body / 2, -60, 60, 70);
    ellipse(body, 0, 80, 80);
    ellipse(body / 2, 60, 70, 60);
  }

  drawEyes(body) {
    let EyeX = sin(frameCount * 0.2) * 5;
    let EyeY = cos(frameCount * 0.2) * 3;
    noStroke();
    fill(0);
    ellipse(-5 + EyeX + body / 2, -50 + EyeY, 5, 10);
    ellipse(5 + EyeX + body / 2, -50 + EyeY, 5, 10);
  }

  drawFeet(body) {
    noStroke();
    fill(180, 120, 80);
    ellipse(body - 20, 90, 12, 8);
    ellipse(body + 20, 90, 12, 8);
  }

  drawHands(body) {
    let bodyX = sin(frameCount * 0.2) * 5;
    let bodyY = cos(frameCount * 0.2) * 3;
    noStroke();
    fill(180, 120, 80);
    ellipse(-50 + bodyX + body * 2, -5 + bodyY, 12, 8);
    ellipse(50 + bodyX + body * 2, bodyY, 12, 8);
  }
}