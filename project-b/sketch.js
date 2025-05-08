let selectedScene = 0;

let particles = [];
let imgBg;
let imgPs;
let imgArray = [];
let petals = [];

let arrowRight;
let arrowLeft;

let grph1, grph2, grph3, grph4, grph5; // graphics
let bg0, bg1, bg2, bg3, bg4, bg5;

let returnButton;

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
}


function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("p5-canvas-container");

  grph1 = createGraphics(350, 500);
  grph2 = createGraphics(350, 500);
  grph3 = createGraphics(350, 500);
  grph4 = createGraphics(350, 500);
  grph5 = createGraphics(350, 500);

  let numParticles = imgArray.length;
  let spacing = width / (numParticles + 1);

  for (let i = 0; i < numParticles; i++) {
    let x = spacing * (i + 1);
    let y = random(-50, 0)
    let img = imgArray[i];
    let newP = new Particle(x, y, img, i + 1);
    particles.push(newP);

  }

  for (let i = 0; i < 30; i++) {
    petals.push(new Petal());
  }


  arrowRight = new ArrowRight();
  arrowLeft = new ArrowLeft();

  returnButton = new ReturnButton();
}

function draw() {
  background(255);



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
  fill(255);
  noStroke();
  rect(0, 0, width, 150);
  imageMode(CORNER);
  image(imgBg, 0, 0, width, 200);
  imageMode(CENTER);
  image(imgPs, width / 2, height - 125, 250, 300);
  pop();
  imageMode(CENTER);

  if (selectedScene == 0) {
    //
  } else if (selectedScene >= 1 && selectedScene <= 5) {
    if (selectedScene == 1) {
      image(bg1, width / 2, height / 2);
      drawScene1(grph1, width / 4, height / 2);
      textSize(18);
      fill(0)
      text('"玉带林中挂，金簪雪里埋"', 500, 180)
      let baodai1 = '"The jade belt hangs in the woods;           the golden hairpin lies buried in snow."';
      text(baodai1, 460, 200, 360, 250)
      textSize(15);
      let baodai2 = 'The verse alludes to the fates of 林黛玉Lin Daiyu and 薛宝钗Xue Baochai in Dream of the Red Chamber. The "jade belt" symbolizes Daiyu (with "jade" homophonic to her name), hanging lifeless in the woods, foreshadowing her tragic death. The "golden hairpin" represents Baochai (associated with gold), buried in snow ("snow" sounds like "Xue"), reflecting her noble yet lonely destiny.'
      text(baodai2, 440, 280, 450, 400)
    } else if (selectedScene == 2) {
      image(bg2, width / 2, height / 2);
      drawScene2(grph2, width / 4, height / 2);
      textSize(18);
      fill(0)
      text('"展眼吊斜晖，湘江水逝楚云飞"', 500, 180)
      let xiangyun1 = '"Gazing afar, she mourns the fading light                         — Where Xiang River flows and Chu clouds take flight."';
      text(xiangyun1, 430, 200, 450, 250)
      textSize(15);
      let xiangyun2 = 'The verse alludes to Shi Xiangyun’s tragic fate in Dream of the Red Chamber. "Mourning the fading light" reflects her helplessness before life’s twilight; "Xiang River flows and Chu clouds fly" encodes her name (湘云/Xiangyun), while water and drifting clouds symbolize the loss of her youth and her rootless destiny.'
      text(xiangyun2, 440, 280, 450, 400)
    } else if (selectedScene == 3) {
      image(bg3, width / 2, height / 2);
      drawScene3(grph3, width / 4, height / 2);
      textSize(18);
      fill(0)
      text('"清明涕送江边望，千里东风一梦遥"', 500, 180)
      let tanchun1 = '"In clear dawn’s light, she weeps by the river, gazing far;              A thousand miles away, the east wind carries her dream afar."';
      text(tanchun1, 410, 200, 490, 200)
      textSize(15);
      let tanchun2 = 'The verse depicts 探春Tanchun’s farewell as she marries far away in Dream of the Red Chamber. "Clear dawn" (Qingming) hints at both the season and her desolation; "weeps by the river, gazing far" shows her tearful longing for home. "The east wind carries her dream afar" symbolizes her exile—like a willow catkin drifting beyond reach, forever dreaming of return.'
      text(tanchun2, 440, 280, 450, 400)
    } else if (selectedScene == 4) {
      image(bg4, width / 2, height / 2);
      drawScene4(grph4, width / 4, height / 2);
      textSize(18);
      fill(0)
      text('"可怜金玉质，终陷淖泥中！"', 500, 180)
      let miaoyu1 = '"Noble as gold and jade, yet doomed to fall      — Trapped in the mire, defiled, undone by all!"';
      text(miaoyu1, 460, 200, 400, 250)
      textSize(15);
      let miaoyu2 = 'The verse foreshadows 妙玉Miaoyu’s fate in Dream of the Red Chamber. "Gold and jade" reflects her elite status and spiritual purity, while "trapped in the mire" starkly contrasts her downfall—violated and humiliated. This mirrors the novel’s central tragedy: the destruction of beauty in a corrupt world.'
      text(miaoyu2, 440, 280, 450, 400)
    } else if (selectedScene == 5) {
      image(bg5, width / 2, height / 2);
      drawScene5(grph5, width / 4, height / 2);
      textSize(18);
      fill(0)
      text('"桃李春风结子完，到头谁似一盆兰"', 500, 180)
      let liwan1 = '"Peach and plum blossoms bear fruit in spring’s embrace,                        yet none can match the orchid’s lonely grace."';
      text(liwan1, 420, 200, 500, 200)
      textSize(15);
      let liwan2 = 'The verse mirrors 李纨Li Wan’s life in Dream of the Red Chamber. "Peach and plum blossoms fruiting then fading" parallels her widowhood after bearing a son; "the orchid" doubly references her son Jia Lan (兰/lan) and her chastity—like a potted orchid: pristinely isolated, yet ultimately rootless in its ceremonial glory.'
      text(liwan2, 440, 280, 450, 400)
    }
  }

  arrowRight.checkMouse();
  arrowRight.display();
  arrowLeft.checkMouse();
  arrowLeft.display();

  returnButton.checkMouse();
  returnButton.display();
}

class ArrowRight {
  constructor() {
    this.rad = 20;
    this.x = 990;
    this.y = 300;
    this.canClick = true
  }
  checkMouse() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      let distance = dist(this.x, this.y, mouseX, mouseY);
      if (distance < this.rad && mouseIsPressed && this.canClick) {
        this.canClick = false;
        selectedScene = selectedScene % 5 + 1;
      }
      if (!mouseIsPressed) {
        this.canClick = true;
      }
    }
  }
  display() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      fill(164, 180, 101);
      noStroke();
      beginShape();
      vertex(970, 285);
      vertex(995, 300);
      vertex(970, 315);
      endShape(CLOSE);
    }
  }
}

class ArrowLeft {
  constructor() {
    this.rad = 20;
    this.x = 10;
    this.y = 300;
    this.canClick = true;
  }

  checkMouse() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      let distance = dist(this.x, this.y, mouseX, mouseY);
      if (distance < this.rad && mouseIsPressed && this.canClick) {
        this.canClick = false;
        selectedScene = (selectedScene + 3) % 5 + 1;
      }
      if (!mouseIsPressed) this.canClick = true;
    }
  }

  display() {
    if (selectedScene >= 1 && selectedScene <= 5) {
      fill(164, 180, 101);
      noStroke();
      beginShape();
      vertex(30, 285);
      vertex(5, 300);
      vertex(30, 315);
      endShape(CLOSE);
    }
  }
}

class ReturnButton {
  constructor() {
    this.rad = 15;
    this.x = 630;
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
  }
  // check circular button example and try to add checkMouse() function.
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad && mouseIsPressed == true) {
      selectedScene = this.id;
    } else {
      //
    }
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

class Petal {
  constructor() {
    this.x = random(110, 890);
    this.y = random(-100, -10);
    this.speed = random(1, 3);
    this.size = random(10, 20);
    this.angle = 0;
    this.rotateSpeed = random(-0.02, 0.02);
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
    text("🌸", 0, 0);
    pop();
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
function drawScene4(g, x, y) {
  // background
  g.noStroke();
  g.fill(241, 229, 209);
  g.rect(0, 0, 350, 500);

  g.fill(108, 78, 49);
  g.noStroke();
  g.beginShape();
  g.curveVertex(0, 210);
  g.curveVertex(0, 210);
  g.curveVertex(200, 150);
  g.curveVertex(350, 210);
  g.curveVertex(350, 500);
  g.curveVertex(0, 500);
  g.endShape(CLOSE);

  g.fill(248, 222, 34)
  g.noStroke()
  g.circle(130, 400, 30)

  g.fill(96, 63, 38);
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