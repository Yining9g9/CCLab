let angle = 0;
let r, g, b;
let x1, x2, y1, y2;
let ySpeed1, ySpeed2, xSpeed1, xSpeed2;
let xPos, yPos;
let adjX1, adjY1, adjX2, adjY2;
let xStartSpeed = 1;
let yStartSpeed = 2;
let xDrop, yDrop;

function setup() {
    canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");

    angleMode(DEGREES);

    randomness(width / 2, height / 2);
    xPos = width / 2;
    yPos = height / 2;
}

function draw() {
    background(0, 10);

    //background and changes
    if (
        mouseX > width / 3 &&
        mouseX < (width * 2) / 3 &&
        mouseY > height / 3 &&
        mouseY < (height * 2) / 3
    ) {
        for (let y = 0; y < height; y += 40) {
            for (let x = 0; x < width; x += 40) {
                let rBg = random(150, 200);
                let gBg = map(y, 0, height, 200, 0);
                let bBg = map(x, 0, width, 0, 200);
                let corner = random(0, 20);

                noStroke();
                fill(rBg, gBg, bBg, 50);
                rect(x, y, 40, 40, corner);
            }
        }
    } else {
        for (let y = 0; y < height; y += 40) {
            for (let x = 0; x < width; x += 40) {
                let rBg = random(0, 50);
                let gBg = map(y, 0, height, 200, 0);
                let bBg = map(x, 0, width, 0, 200);
                let corner = random(0, 20);

                noStroke();
                fill(rBg, gBg, bBg, 30);
                rect(x, y, 40, 40, corner);
            }
        }
    }

    ///// MOVE! /////
    if (mouseIsPressed) {
        pressedMotion();
    } else {
        moveCreatures();
    }

    drawCreature(xPos, yPos);

    let radDist = map(sin(frameCount), -1, 1, 50, 150);
    let adjX1 = cos(frameCount * 2) * radDist;
    let adjY1 = sin(frameCount * 2) * radDist;
    drawCreature(xPos + adjX1, yPos + adjY1);

    let adjX2 = cos(frameCount * -1.5) * radDist;
    let adjY2 = sin(frameCount * -1.5) * radDist;
    drawCreature(xPos + adjX2, yPos + adjY2);

    spark();
}

function pressedMotion() {
    targetX = mouseX;
    targetY = mouseY;

    if (mouseX < 0) {
        targetX = 0;
    } else if (mouseX > width) {
        targetX = width;
    }
    if (mouseY < 0) {
        targetY = 0;
    } else if (mouseY > height) {
        targetY = height;
    }

    xPos = lerp(xPos, targetX, 0.3);
    yPos = lerp(yPos, targetY, 0.15);

    xDrop = mouseX;
    yDrop = mouseY;
    let radDrop = 0;
    radDrop = radDrop + random(0, 200);
    let rDrop, gDrop, bDrop;

    if (
        mouseX > width / 3 &&
        mouseX < (width * 2) / 3 &&
        mouseY > height / 3 &&
        mouseY < (height * 2) / 3
    ) {
        rDrop = 255;
        gDrop = 190;
        bDrop = 190;
    } else {
        rDrop = 190;
        gDrop = 255;
        bDrop = 200;
    }

    stroke(rDrop, gDrop, bDrop);
    noFill();
    circle(xDrop, yDrop, radDrop);
}

function moveCreatures() {
    if (
        mouseX > width / 3 &&
        mouseX < (width * 2) / 3 &&
        mouseY > height / 3 &&
        mouseY < (height * 2) / 3
    ) {
        xPos = xPos + random(-10, 10);
        yPos = yPos + random(-10, 10);
    } else {
        //1
        xPos = xPos + xStartSpeed;
        yPos = yPos + yStartSpeed;

        if (xPos < 0) {
            xPos = 0;
            xStartSpeed = xStartSpeed * -1;
        } else if (xPos > width) {
            xPos = width;
            xStartSpeed = xStartSpeed * -1;
        }

        if (yPos < 0) {
            yPos = 0;
            yStartSpeed = yStartSpeed * -1;
        } else if (yPos > height) {
            yPos = height;
            yStartSpeed = yStartSpeed * -1;
        }
        //2
        adjX1 = adjX1 + xStartSpeed;
        adjY1 = adjY1 + yStartSpeed;

        if (adjX1 < 0) {
            adjX1 = 0;
            xStartSpeed = xStartSpeed * -1;
        } else if (adjX1 > width) {
            adjX1 = width;
            xStartSpeed = xStartSpeed * -1;
        }

        if (adjY1 < 0) {
            adjY1 = 0;
            yStartSpeed = yStartSpeed * -1;
        } else if (adjY1 > height) {
            adjY1 = height;
            yStartSpeed = yStartSpeed * -1;
        }

        //3
        adjX2 = adjX2 + xStartSpeed;
        adjY2 = adjY2 + yStartSpeed;

        if (adjX2 < 0) {
            adjX2 = 0;
            xStartSpeed = xStartSpeed * -1;
        } else if (adjX2 > width) {
            adjX2 = width;
            xStartSpeed = xStartSpeed * -1;
        }

        if (adjY2 < 0) {
            adjY2 = 0;
            yStartSpeed = yStartSpeed * -1;
        } else if (adjY2 > height) {
            adjY2 = height;
            yStartSpeed = yStartSpeed * -1;
        }
    }
}

function randomness(x, y) {
    push();
    translate(x, y);
    scale(0.08);
    x1 = random(-width / 2, -width / 6);
    x2 = random(width / 6, width / 2);
    y1 = random(-height / 2, height / 2);
    y2 = random(-height / 2, height / 2);
    xSpeed1 = random(-3, 3);
    ySpeed1 = random(-1, 1);
    xSpeed2 = random(-3, 3);
    ySpeed2 = random(-1, 1);
    pop();
}

function mouseDragged() {
    for (let y = 0; y < height; y += 40) {
        for (let x = 0; x < width; x += 40) {
            let rBg = random(150, 200);
            let gBg = map(y, 0, height, 200, 0);
            let bBg = map(x, 0, width, 0, 200);
            let corner = random(0, 20);

            noStroke();
            fill(rBg, gBg, bBg, 50);
            rect(x, y, 40, 40, corner);
        }
    }
    xD = map(mouseX, 0, width, random((width * 9) / 10, width), 0);
    yD = map(mouseY, 0, height, height, 0);
    drawCreature(xD, yD);
    wings(xD, yD);
}

function drawCreature(x, y) {
    push();
    translate(x, y);
    scale(0.08);
    rotate(90);
    rotate(x + y - width / 2 - height / 2);

    x1 = x1 + xSpeed1;
    y1 = y1 + ySpeed1;

    if (x1 < -x || x1 > -width / 8) {
        xSpeed1 = xSpeed1 * -1;
    }
    if (y1 < -y || y1 > y) {
        ySpeed1 = ySpeed1 * -1;
    }

    x2 = x2 + xSpeed2;
    y2 = y2 + ySpeed2;

    if (x2 < width / 8 || x2 > x) {
        xSpeed2 = xSpeed2 * -1;
    }
    if (y2 < -y || y2 > y) {
        ySpeed2 = ySpeed2 * -1;
    }

    for (let i = 0; i < 200; i++) {
        let angle = random(360);
        amp = 180 + sin(angle * 7) * 6 + sin(angle * 4) * 10;

        let cosValue = cos(angle) * amp;
        let sinValue = sin(angle) * amp;

        let x3 = cosValue;
        let y3 = sinValue;

        if (
            mouseX > width / 3 &&
            mouseX < (width * 2) / 3 &&
            mouseY > height / 3 &&
            mouseY < (height * 2) / 3
        ) {
            r = map(sinValue, -180, 180, 100, 230);
            g = map(sinValue, -180, 180, 0, 180);
            b = map(cosValue, 80, -80, 230, 100);

            x1 = x1 + xSpeed1 * 1.3;
            y1 = y1 + ySpeed1 * 1.3;
            x2 = x2 + xSpeed2 * 1.3;
            y2 = y2 + ySpeed2 * 1.3;
            stroke(r, g, b);
            strokeWeight(5);
            line(x1, y1, x3, y3);
            line(x2, y2, x3, y3);
        } else {
            r = map(sinValue, -180, 180, 0, 180);
            g = map(sinValue, -180, 180, 100, 230);
            b = map(cosValue, 80, -80, 230, 100);
            stroke(r, g, b);
            strokeWeight(0.5);
            line(x1, y1, x3, y3);
            line(x2, y2, x3, y3);
        }
    }

    pop();

    wings(x, y);
}

function wings(xWings, yWings) {
    push();
    translate(xWings, yWings);
    rotate(xWings + yWings - width / 2 - height / 2);
    let freq;
    let rW, gW, bW;
    if (
        mouseX > width / 3 &&
        mouseX < (width * 2) / 3 &&
        mouseY > height / 3 &&
        mouseY < (height * 2) / 3
    ) {
        freq = frameCount * 3;
        rW = 180;
        gW = 0;
        bW = 0;
    } else {
        freq = frameCount;
        rW = 180;
        gW = 180;
        bW = 0;
    }
    let amp = 20;
    let cosValue = cos(freq) * amp;
    let sinValue = sin(freq) * amp;

    let x6 = 50 + sinValue;
    let y6 = sinValue;

    let x7 = -50 - sinValue;
    let y7 = sinValue;

    strokeWeight(random(0.3, 1));
    stroke(rW, gW, bW);
    line(0, 0, x6, y6);
    line(0, 0, x7, y7);
    pop();
}

function spark() {
    if (
        mouseX > width / 3 &&
        mouseX < (width * 2) / 3 &&
        mouseY > height / 3 &&
        mouseY < (height * 2) / 3 &&
        mouseIsPressed
    ) {
        let xSpark = random(0, width);
        let ySpark = random(0, height);
        circle(xSpark, ySpark, 10);
    } else {
    }
}
