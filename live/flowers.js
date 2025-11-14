// Tweak these parameters as you like:
var numPoints = 3;
var numRotations = 3;
var xOffset = 0;
var yOffset = 0;
var xRandom = 140;
var yRandom = 170;
var dimensions = 512;
var positionWobble = 10;

//color:
var hMaxValue = 100;
var s = 70;
var b = 85;
var a = 50;
//------

function setup() {
  drawFlower();
}

function mouseClicked(){
  openFullscreen();
  drawFlower();
}

function drawFlower(){
 // numRotations = round(pow(random(1,10), 2)+2);
  numRotations *= random(0.4,1.7);
  numRotations = round(constrain(numRotations,3,250));
  clear();
  createCanvas(windowWidth , windowHeight).parent("p5");
  colorMode(HSB, 100);
  background(10, 10, 10, 255);
  drawShape();
  offset(1.2)
  drawShape();
  offset(0.2)
  drawShape();
}

function offset(s){
  translate(-windowWidth * s / 2, -windowHeight * s / 2);
  scale(s);
  translate(random(positionWobble, -positionWobble), random(positionWobble, -positionWobble))
  
}

function drawShape(){
  var shape = prepareShape();
  
  translate(windowWidth/2, windowHeight/2);
  strokeWeight(0);
  fill(random(0, hMaxValue), s, b, a);
  blendMode(ADD);
  
  for(var j = 0; j < numRotations; j++){
    beginShape();
    for (var i = 0; i < shape.length; i++) {
       vertex(shape[i][0], shape[i][1]);
    }
    rotate(2 * PI / numRotations);
    endShape(CLOSE);
  }
}

function prepareShape(){
  var arr = [];
  for(var i = 0; i < numPoints; i++){
    arr.push([xOffset + random(xRandom), yOffset + random(yRandom)]);
  }
  return arr;
}

/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}