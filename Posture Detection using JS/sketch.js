background(200);
     console.log('Draw function');
    // 1.Point
    point(200,200);
    // 2.Line
    line(200, 200, 300, 300);
    // 3.Triangle
    triangle(100, 200, 200, 300, 250, 300);
    // 4.Rectangle
    rect(500, 200, 200, 100);
    // 5.Square
    ellipse(400, 300, 300, 100);


function setup(params) {
    createCanvas(800, 500);
    console.log('Setup function');
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function draw(params) {
    r = getRandomArbitrary(0, 255);
    g = getRandomArbitrary(0, 255);
    b = getRandomArbitrary(0, 255);
    fill(r,g,b);
    ellipse(mouseX, mouseY, 50, 50);
}

let capture;

function setup(params) {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide()
}

        noseX = singlePose.nose.x;
        noseY = singlePose.nose.y;

        reyeX = singlePose.rightEye.x;
        reyeY = singlePose.rightEye.y;

        leyeX = singlePose.leftEye.x;
        leyeY = singlePose.lefttEye.y;

function draw(params) {
    image(capture, 0, 0, 800, 600)
    ellipse(reyeX, reyeY, 30);
    ellipse(leyeX, leyeY, 30);
}

        