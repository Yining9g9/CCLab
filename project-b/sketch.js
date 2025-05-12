let showIntroduction = true;
let selectedScene = 0;
let allScenesViewed = false;
let endingState = 0;
let lastScene = -1;

let particles = [];
let imgArray = [];
let petals = [];
let snowflakes = [];
let mouseSnowflakes = [];
let clouds = [];
let ripples = [];
let fruits = [];

let pointsX = [];
let pointsY = [];
let pointsColor = [];
let shownPointsIndex = 0;
let totalPoints = 3000;

// let arrowRight;
// let arrowLeft;
let returnButton;

let imgBg;
let imgPs;
let grph1, grph2, grph3, grph4o, grph4d, grph5; // graphics
let bg0, bg1, bg2, bg3, bg4, bg5;
let checked1 = false;
let checked2 = false;
let checked3 = false;
let checked4 = false;
let checked5 = false;

let bgMusic;
let sceneMusic;
let currentMusic;

function preload() {
  imgBg = loadImage("assets/wuyan.png");
  imgPs = loadImage("assets/BaoYu.png");

  for (let i = 1; i <= 5; i++) {
    //let img = loadImage(`assets/img${i}.png`);
    let img = loadImage("assets/img" + i + ".png");
    imgArray.push(img);
  }

  bg0 = loadImage("assets/bg0.jpg");
  bg1 = loadImage("assets/bg1.jpg");
  bg2 = loadImage("assets/bg2.jpg");
  bg3 = loadImage("assets/bg3.jpg");
  bg4 = loadImage("assets/bg4.jpg");
  bg5 = loadImage("assets/bg5.jpg");

  snowSound = loadSound("assets/snow.mp3");
  windSound = loadSound("assets/wind.mp3");
  bgMusic = loadSound("assets/bgmusic.mp3");

}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");
  textFont("Noto Serif TC");


  grph1 = createGraphics(350, 500);
  grph2 = createGraphics(350, 500);
  grph3 = createGraphics(350, 500);
  grph4o = createGraphics(350, 500);
  grph4d = createGraphics(350, 500);
  grph5 = createGraphics(350, 500);

  drawScene4o(grph4o, width / 4, height / 2);
  loadPoints();

  let numParticles = imgArray.length;
  let spacing = width / (numParticles + 1);

  for (let i = 0; i < numParticles; i++) {
    let x = spacing * (i + 1);
    let y = random(0, 50);
    let img = imgArray[i];
    let newP = new Particle(x, y, img, i + 1);
    particles.push(newP);
  }

  for (let i = 0; i < 30; i++) {
    petals.push(new Petal());
  }

  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake());
  }

  // arrowRight = new ArrowRight();
  // arrowLeft = new ArrowLeft();
  returnButton = new ReturnButton();

  currentMusic = bgMusic;
  currentMusic.loop();
  currentMusic.setVolume(0.2);

  fruits.push(new Fruit(274, 265, 12));
  fruits.push(new Fruit(241, 209, 15));
  fruits.push(new Fruit(167, 243, 13));
}

function draw() {

  drawMainContent();

  if (showIntroduction) {
    drawIntroduction();
  }

  if (allScenesViewed) {
    if (endingState === 0) {
    } else if (endingState === 1) {
      drawMaskAndText();
    } else if (endingState === 2) {
      drawEnding();
    }
  }

  if (selectedScene !== lastScene) {
    handleSceneMusic();
    lastScene = selectedScene;
  }
}

function drawIntroduction() {
  noStroke();
  fill(176, 146, 119, 200);
  rect(0, 0, width, height);
  // textFont("Noto Serif TC");
  textAlign(CENTER, CENTER);

  fill(255);
  textSize(32);
  text("Life is but a Dream", width / 2, height / 3);

  textSize(18);
  textLeading(28);
  text(
    "This interactive experience draws inspiration from Dream of the Red Chamber,\n" +
    " where the boundaries between illusion and reality blur like morning mist\n" +
    "\n" +
    "Now you are 寶玉 Baoyu, entering the department that control the fate...\n" +
    "you read the fate of people around you...",
    width / 2, height / 2 + 20
  );

  textSize(16);
  text("Click to begin the journey", width / 2, height * 0.7);

}

function mousePressed() {
  if (showIntroduction) {
    showIntroduction = false;
  } else if (allScenesViewed) {
    if (endingState === 0) {
      endingState = 1;
    } else if (endingState === 1) {
      endingState = 2;
    }
  }
}

function drawScene0() {
  background(176, 146, 119, 204);

  textAlign(LEFT, TOP);
  push();
  imageMode(CENTER);
  image(bg0, width / 2, (height + 150) / 2, 800, 450);
  pop();


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.checkMouse();
    p.update();
    p.display();
    p.reappear();

  }

  for (let i = 0; i < petals.length; i++) {
    let pe = petals[i];
    pe.update();
    pe.display();
  }

  push();
  fill(176, 146, 119);
  noStroke();
  rect(0, 0, width, 150);
  imageMode(CORNER);
  image(imgBg, 0, 0, width, 200);
  imageMode(CENTER);
  image(imgPs, width / 2, height - 125, 250, 300);
  pop();
  imageMode(CENTER);
}
function drawMainContent() {

  if (selectedScene == 0) {
    drawScene0();
  } else if (selectedScene >= 1 && selectedScene <= 5) {
    if (selectedScene == 1) {
      switchScene1();

      if (random() < 0.7) {
        mouseSnowflakes.push(new MouseSnowflake(mouseX, mouseY));
      }

      for (let i = mouseSnowflakes.length - 1; i >= 0; i--) {
        mouseSnowflakes[i].update();
        mouseSnowflakes[i].display();
        mouseSnowflakes[i].checkOutOfCanvas();
        if (mouseSnowflakes[i].isDone) {
          mouseSnowflakes.splice(i, 1);
        }

      }
    } else if (selectedScene == 2) {
      switchScene2();

      if (mouseIsPressed && frameCount % 5 === 0) {
        clouds.push(new Cloud(mouseX, mouseY));
      }

      for (let i = clouds.length - 1; i >= 0; i--) {
        clouds[i].update();
        clouds[i].display();
        if (clouds[i].lifespan <= 0) {
          clouds.splice(i, 1);
        }
      }
    } else if (selectedScene == 3) {
      switchScene3();

      if (mouseIsPressed) {
        ripples.push(new Ripple(mouseX, mouseY));
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].display();
      }

    } else if (selectedScene == 4) {
      switchScene4();
    } else if (selectedScene == 5) {
      switchScene5();

      for (let i = 0; i < fruits.length; i++) {
        let f = fruits[i];
        f.checkMouse();
        f.move();
        f.display();
      }
    }
  }
  if (checked1 && checked2 && checked3 && checked4 && checked5 && selectedScene == 0) {
    allScenesViewed = true;
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("after viewing all the destiny of those in your life...", width / 2, height / 2);
  }

  // arrowRight.checkMouse();
  // arrowRight.display();
  // arrowLeft.checkMouse();
  // arrowLeft.display();

  returnButton.checkMouse();
  returnButton.display();

}

function switchScene1() {
  checked1 = true;
  particles[0].checked = true;
  particles[0].r = 128;
  particles[0].g = 157;
  particles[0].b = 60;

  image(bg1, width / 2, height / 2);
  drawScene1(grph1, width / 4, height / 2);

  for (let i = 0; i < snowflakes.length; i++) {
    snowflakes[i].update();
    snowflakes[i].display();
  }
  while (snowflakes.length > 150) {
    snowflakes.splice(0, 1);
  }
  if (random() < 0.5) {
    snowflakes.push(new Snowflake());
  }

  textSize(18);
  fill(0);
  text('"玉帶林中掛，金簪雪裏埋"', 440, 130);
  let baodai1 = '"The jade belt hangs in the woods;                  the golden hairpin lies buried in snow."';
  text(baodai1, 440, 160, 370, 250);
  textSize(15);
  let baodai2 = 'The verse alludes to the fates of 林黛玉 Lin Daiyu and 薛寶釵 Xue Baochai in Dream of the Red Chamber. The "jade belt" symbolizes Daiyu (with "jade" homophonic to her name), hanging lifeless in the woods, foreshadowing her tragic death. The "golden hairpin" represents Baochai (associated with gold), buried in snow ("snow" sounds like "Xue"), reflecting her noble yet lonely destiny.'
  text(baodai2, 440, 240, 450, 400);
}
function switchScene2() {
  checked2 = true;
  particles[1].checked = true;
  particles[1].r = 255;
  particles[1].g = 167;
  particles[1].b = 37;
  image(bg2, width / 2, height / 2);
  drawScene2(grph2, width / 4, height / 2);
  textSize(18);
  fill(0);
  text('"展眼吊斜暉，湘江水逝楚雲飛"', 440, 130);
  let xiangyun1 = '"Gazing afar, she mourns the fading light                                   — Where Xiang River flows and Chu clouds take flight."';
  text(xiangyun1, 440, 160, 500, 250);
  textSize(15);
  let xiangyun2 = 'The verse alludes to 湘雲 Xiangyun’s tragic fate in Dream of the Red Chamber. "Mourning the fading light" reflects her helplessness before life’s twilight; "Xiang River flows and Chu clouds fly" encodes her name, while water and drifting clouds symbolize the loss of her youth and her rootless destiny.'
  text(xiangyun2, 440, 240, 450, 400);
}
function switchScene3() {
  checked3 = true;
  particles[2].checked = true;
  particles[2].r = 255;
  particles[2].g = 227;
  particles[2].b = 26;
  image(bg3, width / 2, height / 2);
  drawScene3(grph3, width / 4, height / 2);
  textSize(18);
  fill(0);
  text('"清明涕送江邊望，千里東風一夢遙"', 440, 130);
  let tanchun1 = '"In clear dawn’s light, she weeps by the river, gazing far;              A thousand miles away, the east wind carries her dream afar."';
  text(tanchun1, 440, 160, 530, 200);
  textSize(15);
  let tanchun2 = 'The verse depicts 探春 Tanchun’s farewell as she marries far away in Dream of the Red Chamber. "Clear dawn" (Qingming) hints at both the season and her desolation; "weeps by the river, gazing far" shows her tearful longing for home. "The east wind carries her dream afar" symbolizes her exile—like a willow catkin drifting beyond reach, forever dreaming of return.'
  text(tanchun2, 440, 240, 450, 400);
}
function switchScene4() {
  checked4 = true;
  particles[3].checked = true;
  particles[3].r = 48;
  particles[3].g = 152;
  particles[3].b = 152;
  image(bg4, width / 2, height / 2);

  drawScene4o(grph4o, width / 4, height / 2);
  drawScene4d(grph4d, width / 4, height / 2);
  textSize(18);
  fill(0);
  text('"可憐金玉質，終陷淖泥中！"', 440, 130);
  let miaoyu1 = '"Noble as gold and jade, yet doomed to fall           — Trapped in the mire, defiled, undone by all!"';
  text(miaoyu1, 440, 160, 420, 250);
  textSize(15);
  let miaoyu2 = 'The verse foreshadows 妙玉 Miaoyu’s fate in Dream of the Red Chamber. "Gold and jade" reflects her elite status and spiritual purity, while "trapped in the mire" starkly contrasts her downfall—violated and humiliated. This mirrors the novel’s central tragedy: the destruction of beauty in a corrupt world.'
  text(miaoyu2, 440, 240, 450, 400);
}
function switchScene5() {
  checked5 = true;
  particles[4].checked = true;
  particles[4].r = 191;
  particles[4].g = 49;
  particles[4].b = 49;
  image(bg5, width / 2, height / 2);
  drawScene5(grph5, width / 4, height / 2);
  textSize(18);
  fill(0);
  text('"桃李春風結子完，到頭誰似一盆蘭"', 440, 130);
  let liwan1 = '"Peach and plum blossoms bear fruit in spring’s embrace,                              yet none can match the orchid’s lonely grace."';
  text(liwan1, 440, 160, 550, 200);
  textSize(15);
  let liwan2 = 'The verse mirrors 李紈 Li Wan’s life in Dream of the Red Chamber. "Peach and plum blossoms fruiting then fading" parallels her widowhood after bearing a son; "the orchid" doubly references her son Jia Lan (蘭/lan) and her chastity—like a potted orchid: pristinely isolated, yet ultimately rootless in its ceremonial glory.'
  text(liwan2, 440, 240, 450, 400);
}

function drawMaskAndText() {
  noStroke();
  fill(176, 146, 119, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("It feels like life is just like a dream...", width / 2, height / 2);
}

function drawEnding() {
  noStroke();
  fill(176, 146, 119, 200);
  rect(0, 0, width, height);

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("If life is but a dream...", width / 2, height / 2 - 50);
  text("what will you awaken to?", width / 2, height / 2);
}

function handleSceneMusic() {
  if (sceneMusic) {
    sceneMusic.stop();
  }

  if (selectedScene == 1 || selectedScene == 4 || selectedScene == 5) {
    sceneMusic = snowSound;
  } else if (selectedScene == 2 || selectedScene == 3) {
    sceneMusic = windSound;
  }

  if (sceneMusic) {
    sceneMusic.loop();
    sceneMusic.setVolume(0.7);
  }
}

// class ArrowRight {
//   constructor() {
//     this.rad = 20;
//     this.x = 990;
//     this.y = 300;
//     this.canClick = true
//   }
//   checkMouse() {
//     if (selectedScene >= 1 && selectedScene <= 5) {
//       let distance = dist(this.x, this.y, mouseX, mouseY);
//       if (distance < this.rad && mouseIsPressed && this.canClick) {
//         this.canClick = false;
//         selectedScene = selectedScene % 5 + 1;
//       }
//       if (!mouseIsPressed) {
//         this.canClick = true;
//       }
//     }
//   }
//   display() {
//     if (selectedScene >= 1 && selectedScene <= 5) {
//       fill(164, 180, 101);
//       noStroke();
//       beginShape();
//       vertex(970, 285);
//       vertex(995, 300);
//       vertex(970, 315);
//       endShape(CLOSE);
//     }
//   }
// }

// class ArrowLeft {
//   constructor() {
//     this.rad = 20;
//     this.x = 10;
//     this.y = 300;
//     this.canClick = true;
//   }

//   checkMouse() {
//     if (selectedScene >= 1 && selectedScene <= 5) {
//       let distance = dist(this.x, this.y, mouseX, mouseY);
//       if (distance < this.rad && mouseIsPressed && this.canClick) {
//         this.canClick = false;
//         selectedScene = (selectedScene + 3) % 5 + 1;
//       }
//       if (!mouseIsPressed) this.canClick = true;
//     }
//   }

//   display() {
//     if (selectedScene >= 1 && selectedScene <= 5) {
//       fill(164, 180, 101);
//       noStroke();
//       beginShape();
//       vertex(30, 285);
//       vertex(5, 300);
//       vertex(30, 315);
//       endShape(CLOSE);
//     }
//   }
// }

class ReturnButton {
  constructor() {
    this.rad = 15;
    this.x = 580;
    this.y = 450;
    this.canClick = true;
  }

  checkMouse() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      let distance = dist(this.x, this.y, mouseX, mouseY);
      if (distance < this.rad && mouseIsPressed && this.canClick) {
        this.canClick = false;
        selectedScene = 0;

      }
      if (!mouseIsPressed) {
        this.canClick = true;
      }
    }
  }

  display() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      fill(240, 187, 120);
      noStroke();
      circle(this.x, this.y, this.rad * 2);

      fill(0);
      push();
      textAlign(CENTER, CENTER);
      textSize(10);
      text("RETURN", this.x, this.y);
      pop();
    }
  }
}

class Particle {
  constructor(x, y, img, id) {
    this.id = id;
    this.baseX = x;
    this.x = x;
    this.y = y + random(-10, 10);
    this.offset = random(TWO_PI)
    this.ySpeed = random(1, 2)
    this.img = img;
    this.rad = 40
    this.finalY = height / 2;
    this.checked = false;
    this.glowSize = 0;
    this.frozenX = 0;
    this.frozenY = 0;
    this.frozenRotation = 0;
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
  // check circular button example and try to add checkMouse() function.
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad && mouseIsPressed == true) {
      selectedScene = this.id;
      this.checked = true;
      this.frozenX = this.x;
      this.frozenY = this.y;
      this.frozenRotation = sin(frameCount * 0.05 + this.offset) * 0.2;
    } else {
      //
    }
  }
  update() {
    if (!this.checked) {
      this.y += this.ySpeed;
      this.x = this.baseX + sin(frameCount * 0.05 + this.offset) * 20;
    }
  }
  display() {
    push();

    if (this.checked) {
      translate(this.frozenX, this.frozenY);
      rotate(this.frozenRotation);
      this.glowSize = lerp(this.glowSize, 25, 0.05);
      let alpha = map(sin(frameCount * 0.05), -1, 1, 100, 200);
      fill(this.r, this.g, this.b, alpha);
      noStroke();
      circle(0, 0, this.glowSize);

      fill(this.r, this.g, this.b, alpha * 0.5);
      circle(0, 0, this.glowSize * 1.5);


    } else {
      translate(this.x, this.y);
      rotate(sin(frameCount * 0.05 + this.offset) * 0.2);
      imageMode(CENTER);
      image(this.img, 0, 0, 40, 80);
    }

    pop();
  }
  reappear() {
    if (!this.checked) {
      if (this.y < -50) {
        this.y = height + 50;
      }
      else if (this.y > height + 50) {
        this.y = - 50;
      }
    }
  }
}

class Petal {
  constructor() {
    this.x = random(110, 890);
    this.y = random(-50, 50);
    this.speed = random(1, 3);
    this.size = random(10, 20);
    this.angle = 0;
    this.rotateSpeed = random(-0.03, 0.04);
  }
  update() {
    this.y += this.speed;
    this.angle += this.rotateSpeed;
    if (this.y > height + 20) {
      this.y = random(-100, -10);
      this.x = random(100, 900);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text("梦", 0, 0);

    pop();
  }
}

class Snowflake {
  constructor() {
    this.sceneX = width / 4;
    this.sceneY = height / 2;
    this.sceneW = 350 * 0.8;
    this.sceneH = 500 * 0.8;

    this.x = random(this.sceneX - this.sceneW / 2, this.sceneX + this.sceneW / 2);
    this.y = random(this.sceneY - this.sceneH / 2 - 20, this.sceneY + this.sceneH / 2);
    this.size = random(2, 5);
    this.speed = random(1, 3);
    this.wind = random(-0.5, 0.5);
    this.alpha = random(150, 255);
    this.lifespan = 1.0;
    this.isDone = false;
  }

  update() {
    this.y += this.speed;
    this.x += this.wind;

    this.lifespan -= 0.002;
    if (this.lifespan <= 0) {
      this.isDone = true;
    }
  }

  display() {
    if (this.x >= this.sceneX - this.sceneW / 2 && this.x <= this.sceneX + this.sceneW / 2 &&
      this.y >= this.sceneY - this.sceneH / 2 && this.y <= this.sceneY + this.sceneH / 2) {
      noStroke();
      fill(255, this.alpha * this.lifespan);
      circle(this.x, this.y, this.size);
    }
  }

  checkOutOfCanvas() {
    if (this.y > this.sceneY + this.sceneH / 2 + 10 ||
      this.x < this.sceneX - this.sceneW / 2 - 10 ||
      this.x > this.sceneX + this.sceneW / 2 + 10) {
      this.isDone = true;
    }
  }
}

class MouseSnowflake {
  constructor(x, y) {
    this.x = x + random(-10, 10);
    this.y = y + random(-10, 10);
    this.size = random(1, 3);
    this.speed = random(2, 4);
    this.wind = random(-1, 1);
    this.alpha = random(200, 255);
    this.lifespan = random(0.7, 1.2);
    this.isDone = false;
  }

  update() {
    this.y += this.speed;
    this.x += this.wind;
    this.lifespan -= 0.0015;

    if (this.lifespan <= 0) {
      this.isDone = true;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, this.alpha * this.lifespan);
    circle(0, 0, this.size);
    pop();
  }

  checkOutOfCanvas() {
    if (this.y > height + 10) {
      this.isDone = true;
    }
  }
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 1);
    this.size = random(50, 100);
    this.lifespan = 255;
  }

  update() {
    this.x += this.speed;
    this.lifespan -= 1;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, this.lifespan);
    for (let i = 0; i < 3; i++) {
      ellipse(0, 0, this.size * (1 - i * 0.2), this.size * 0.3);
      translate(20, -5);
    }
    pop();
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.alpha = 150;
  }

  update() {
    this.radius += 1.5;
    this.alpha -= 3;
  }

  display() {
    noFill();
    stroke(138, 204, 255, this.alpha);
    strokeWeight(random(0.5, 1));
    circle(this.x, this.y, this.radius);
    circle(this.x, this.y, this.radius / 1.5);
    circle(this.x, this.y, this.radius / 2.5);

  }
}

///// #1 /////
function drawScene1(g, x, y) {
  // background
  g.noStroke();
  g.fill(148, 180, 193);
  g.rect(0, 0, 350, 500);

  //snow
  g.fill(240);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 310);
  g.curveVertex(0, 310);
  g.curveVertex(200, 250);
  g.curveVertex(350, 310);
  g.curveVertex(350, 500);
  g.curveVertex(0, 500);
  g.endShape(CLOSE);

  //snow
  g.fill(255);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 410);
  g.curveVertex(0, 410);
  g.curveVertex(203, 330);
  g.curveVertex(215, 410);
  g.curveVertex(350, 330);
  g.curveVertex(350, 500);
  g.curveVertex(0, 500);
  g.endShape(CLOSE);

  //branches
  g.fill(78, 31, 0);
  g.noStroke();
  g.beginShape();
  g.vertex(0, 277);
  g.vertex(75, 203);
  g.vertex(95, 155);
  g.vertex(118, 57);
  g.vertex(93, 200);
  //
  g.vertex(135, 170);
  g.vertex(242, 54);
  g.vertex(165, 160);
  g.vertex(73, 235);
  g.vertex(56, 274);
  //
  g.vertex(168, 223);
  g.vertex(273, 238);
  g.vertex(203, 236);
  g.vertex(157, 239);
  g.vertex(34, 299);
  g.vertex(0, 363);
  g.endShape(CLOSE);

  //玉带
  g.noFill();
  g.stroke(153, 188, 133);
  g.strokeWeight(20);
  g.beginShape();
  g.curveVertex(174, 284);
  g.curveVertex(174, 284);
  g.curveVertex(181, 226);
  g.curveVertex(195, 283);
  g.curveVertex(195, 283);
  g.endShape();

  g.fill(78, 31, 0);
  g.noStroke();
  g.beginShape();
  g.vertex(185, 226);
  g.vertex(273, 238);
  g.vertex(183, 238);
  g.endShape(CLOSE);

  //金簪
  g.fill(248, 222, 34);
  g.noStroke();
  g.beginShape();
  g.vertex(139, 413);
  g.vertex(206, 397);
  g.vertex(208, 400);
  g.endShape(CLOSE);

  g.fill(248, 222, 34);
  g.noStroke();
  g.beginShape();
  g.curveVertex(205, 398);
  g.curveVertex(205, 398);
  //
  g.curveVertex(202, 392);
  g.curveVertex(207, 383);
  g.curveVertex(208, 389);
  g.curveVertex(205, 398);
  //
  g.curveVertex(212, 387);
  g.curveVertex(217, 387);
  g.curveVertex(217, 392);
  g.curveVertex(205, 398);
  //
  g.curveVertex(216, 398);
  g.curveVertex(221, 402);
  g.curveVertex(212, 402);
  g.curveVertex(205, 398);
  //
  g.curveVertex(209, 405);
  g.curveVertex(208, 408);
  g.curveVertex(202, 405);
  //
  g.curveVertex(205, 398);
  g.curveVertex(205, 398);
  g.endShape();



  // draw the graphics as an image
  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);
  pop();
}
///// #2 /////
function drawScene2(g, x, y) {
  // background
  g.noStroke();
  g.fill(255, 159, 0);
  g.rect(0, 0, 350, 500);

  //sun
  g.fill(244, 99, 30);
  g.noStroke();
  g.circle(158, 105, 200);

  //land
  g.fill(103, 174, 110);
  g.noStroke();
  g.circle(200, 800, 1400);

  //river
  g.fill(138, 204, 213);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 500);
  g.curveVertex(0, 500);
  g.curveVertex(0, 473);
  g.curveVertex(129, 373);
  g.curveVertex(106, 269);
  g.curveVertex(166, 180);
  g.curveVertex(151, 130);
  g.curveVertex(167, 102);
  g.curveVertex(190, 100);
  g.curveVertex(181, 123);
  g.curveVertex(213, 196);
  g.curveVertex(188, 274);
  g.curveVertex(246, 344);
  g.curveVertex(280, 414);
  g.curveVertex(350, 453);
  g.curveVertex(350, 453);
  g.curveVertex(350, 500);
  g.endShape(CLOSE);

  //cloud
  g.fill(240);
  g.noStroke();
  g.beginShape();
  g.curveVertex(98, 52);
  g.curveVertex(98, 52);
  g.curveVertex(71, 86);
  g.curveVertex(74, 107);
  g.curveVertex(52, 169);
  g.curveVertex(85, 113);
  g.curveVertex(81, 88);
  g.curveVertex(98, 52);
  g.curveVertex(98, 52);
  g.endShape(CLOSE);

  g.push();
  g.translate(150, 180);
  g.rotate(150);
  g.fill(240);
  g.noStroke();
  g.beginShape();
  g.curveVertex(98, 52);
  g.curveVertex(98, 52);
  g.curveVertex(71, 86);
  g.curveVertex(74, 107);
  g.curveVertex(52, 169);
  g.curveVertex(85, 113);
  g.curveVertex(81, 88);
  g.curveVertex(98, 52);
  g.curveVertex(98, 52);
  g.endShape(CLOSE);
  g.pop();

  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);
  pop();
}
///// #3 /////
function drawScene3(g, x, y) {
  // background
  g.noStroke();
  g.fill(148, 180, 193);
  g.rect(0, 0, 350, 500);

  //sea
  g.fill(138, 204, 213);
  g.noStroke();
  g.circle(200, 800, 1400);

  //grassland
  g.fill(103, 174, 110);
  g.noStroke();
  g.circle(200, 800, 800);

  //kites
  g.fill(255, 214, 58);
  g.stroke(225, 238, 188);
  g.strokeWeight(3);
  g.beginShape();
  g.curveVertex(72, 52);
  g.curveVertex(72, 52);
  g.curveVertex(51, 112);
  g.curveVertex(76, 84);
  g.curveVertex(38, 72);
  g.curveVertex(74, 50);
  g.curveVertex(76, 84);
  g.curveVertex(51, 112);
  g.curveVertex(38, 72);
  g.endShape(CLOSE);

  g.fill(255, 214, 58);
  g.stroke(225, 238, 188);
  g.strokeWeight(3);
  g.beginShape();
  g.curveVertex(234, 215);
  g.curveVertex(234, 215);
  g.curveVertex(264, 279);
  g.curveVertex(286, 246);
  g.curveVertex(225, 257);
  g.curveVertex(234, 215);
  g.curveVertex(286, 246);
  g.curveVertex(264, 279);
  g.curveVertex(225, 257);
  g.endShape(CLOSE);

  g.noFill();
  g.stroke(0);
  g.strokeWeight(1);
  g.beginShape();
  g.curveVertex(52, 119);
  g.curveVertex(52, 119);
  g.curveVertex(80, 152);
  g.curveVertex(73, 202);
  g.curveVertex(100, 235);
  g.curveVertex(100, 235);
  g.endShape();

  g.noFill();
  g.stroke(0);
  g.strokeWeight(1);
  g.beginShape();
  g.curveVertex(265, 288);
  g.curveVertex(265, 288);
  g.curveVertex(281, 317);
  g.curveVertex(248, 346);
  g.curveVertex(259, 386);
  g.curveVertex(259, 386);
  g.endShape();

  //ship
  g.push();
  g.translate(-40, 145);
  g.fill(116, 81, 45);
  g.noStroke();
  g.beginShape();
  g.curveVertex(174, 184);
  g.curveVertex(174, 184);
  g.curveVertex(197, 182);
  g.curveVertex(173, 116);
  g.curveVertex(156, 170);
  g.curveVertex(174, 184);
  g.curveVertex(174, 199);
  g.curveVertex(207, 199);
  g.curveVertex(188, 219);
  g.curveVertex(139, 217);
  g.curveVertex(134, 198);
  g.curveVertex(174, 199);
  g.curveVertex(174, 199);
  g.endShape(CLOSE);
  g.pop()

  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);
  pop();
}
///// #4 /////
function drawScene4o(g, x, y) {
  // background
  g.noStroke();
  g.fill(241, 229, 209, 200);
  g.rect(0, 0, 350, 500);

  g.fill(108, 78, 49, 200);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 210);
  g.curveVertex(0, 210);
  g.curveVertex(200, 150);
  g.curveVertex(350, 210);
  g.curveVertex(350, 500);
  g.curveVertex(0, 500);
  g.endShape(CLOSE);

  g.fill(248, 222, 34, 200)
  g.noStroke()
  g.circle(130, 400, 30)

  g.fill(96, 63, 38, 200);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 424);
  g.curveVertex(0, 424);
  g.curveVertex(130, 400);
  g.curveVertex(255, 500);
  g.curveVertex(0, 500);
  g.endShape(CLOSE);

  g.noFill()
  g.stroke(255, 0, 0);
  g.strokeWeight(1)
  g.beginShape();
  g.curveVertex(133, 389);
  g.curveVertex(133, 389);
  g.curveVertex(135, 367);
  g.curveVertex(155, 352);
  g.curveVertex(151, 375);
  g.curveVertex(136, 386);
  g.curveVertex(136, 386);
  g.endShape();

  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);
  pop();

}

function drawScene4d(g, x, y) {
  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);

  for (let i = 0; i <= shownPointsIndex; i++) {
    let x = pointsX[i];
    let y = pointsY[i];
    let clr = pointsColor[i];
    fill(clr);
    circle(x - 175, y - 250, 15);
  }

  pop();

  if (shownPointsIndex < totalPoints - 1) {
    shownPointsIndex++;
  }
}
///// #5 /////
function drawScene5(g, x, y) {
  // background
  g.noStroke();
  g.fill(148, 180, 193);
  g.rect(0, 0, 350, 500);

  //branches
  g.fill(78, 31, 0);
  g.noStroke();
  g.beginShape();
  g.vertex(0, 195);
  g.vertex(50, 173);
  g.vertex(124, 123);
  g.vertex(190, 93);
  g.vertex(78, 168);
  //
  g.vertex(144, 144);
  g.vertex(289, 119);
  g.vertex(159, 154);
  g.vertex(73, 185);
  g.vertex(51, 200);
  //
  g.vertex(168, 193);
  g.vertex(273, 208);
  g.vertex(203, 206);
  g.vertex(107, 205);
  g.vertex(34, 219);
  g.vertex(0, 373);
  g.endShape(CLOSE);

  //fruit
  g.fill(225, 238, 188)
  g.circle(124, 115, 30)
  g.circle(251, 154, 30)
  g.circle(117, 223, 30)

  //兰
  g.fill(50, 142, 110);
  g.noStroke();
  g.beginShape();
  g.curveVertex(182, 400);
  g.curveVertex(182, 400);
  //
  g.curveVertex(155, 381);
  g.curveVertex(182, 401);
  //
  g.curveVertex(183, 365);
  g.curveVertex(216, 353);
  g.curveVertex(189, 370);
  g.curveVertex(182, 400);
  //
  g.curveVertex(167, 366);
  g.curveVertex(134, 345);
  g.curveVertex(172, 377);
  g.curveVertex(183, 400);
  //
  g.curveVertex(162, 342);
  g.curveVertex(180, 325);
  g.curveVertex(169, 342);
  g.curveVertex(183, 400);
  //
  g.curveVertex(210, 318);
  g.curveVertex(251, 301);
  g.curveVertex(213, 334);
  g.curveVertex(183, 400);
  //
  g.curveVertex(212, 367);
  g.curveVertex(183, 400);
  g.endShape()

  //flower
  g.push();
  g.translate(-30, -50)
  g.fill(248, 222, 34);
  g.noStroke();
  g.beginShape();
  g.curveVertex(205, 398);
  g.curveVertex(205, 398);
  //
  g.curveVertex(202, 392);
  g.curveVertex(207, 383);
  g.curveVertex(208, 389);
  g.curveVertex(205, 398);
  //
  g.curveVertex(212, 387);
  g.curveVertex(217, 387);
  g.curveVertex(217, 392);
  g.curveVertex(205, 398);
  //
  g.curveVertex(216, 398);
  g.curveVertex(221, 402);
  g.curveVertex(212, 402);
  g.curveVertex(205, 398);
  //
  g.curveVertex(209, 405);
  g.curveVertex(208, 408);
  g.curveVertex(202, 405);
  //
  g.curveVertex(205, 398);
  g.curveVertex(205, 398);
  g.endShape();
  g.pop()

  push();
  translate(x, y);
  scale(0.8);
  image(g, 0, 0);
  pop();
}

class Fruit {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.xSpd = 0;
    this.ySpd = 0;
    this.isDone = false;
    this.r = 255;
    this.g = 238;
    this.b = 188;
    //
    this.count = 0;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      //
      if (mouseIsPressed) {
        this.r = 255 - 133 * this.count / 300;
        this.b = 238 - 216 * this.count / 300;
        this.g = 188 - 166 * this.count / 300;
        this.count++;
        if (this.count > 300) {
          this.ySpd = 2;
        }
      }
    } else {
      // 
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push(); // for styling

    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.rad * 2);

    pop(); // remove the styles applied.
  }
}

function loadPoints() {
  for (let i = 0; i < totalPoints; i++) {
    let rx = floor(random(grph4o.width));
    let ry = floor(random(grph4o.height));
    let clr = grph4o.get(rx, ry);

    let r4 = red(clr) + floor(random(-5, 5));
    let g4 = green(clr) + floor(random(-5, 5));
    let b4 = blue(clr) + floor(random(-5, 5));

    let newClr = color(r4, g4, b4);
    pointsX.push(rx);
    pointsY.push(ry);
    pointsColor.push(newClr);
  }
}