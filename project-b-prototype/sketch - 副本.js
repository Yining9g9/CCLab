let particles = [];
let imgBg;
let imgPs;
let imgArray = [];

function preload() {
  imgBg = loadImage("assets/Building.png");
  imgPs = loadImage("assets/BaoYu.png");
  for (let i = 1; i <= 5; i++) {
    let img = loadImage(`assets/img${i}.png`);
    imgArray.push(img);
  }
}


function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("p5-canvas-container");

  let numParticles = 5;
  let spacing = width / (numParticles + 1);

  for (let i = 0; i < numParticles; i++) {
    let x = spacing * (i + 1);
    let y = random(-50, 0)
    let img = imgArray[i];
    let newP = new Particle(x, y, img);
    particles.push(newP);
  }
}

function draw() {
  background(70, 30, 10, 100);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.reappear();

  }

  imageMode(CORNER)
  image(imgBg, -25, -100, width + 50, 650);
  imageMode(CENTER);
  image(imgPs, width / 2, height - 100, 200, 250);

}



class Particle {
  constructor(x, y, img) {
    this.baseX = x;
    this.x = x;
    this.y = y + random(-10, 10);
    this.offset = random(TWO_PI)
    this.ySpeed = random(1, 2)
    this.img = img;
  }
  update() {
    this.y += this.ySpeed;
    this.x = this.baseX + sin(frameCount * 0.05 + this.offset) * 20;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(sin(frameCount * 0.05 + this.offset) * 0.2);
    imageMode(CENTER);
    image(this.img, 0, 0, 40, 80)
    pop();

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