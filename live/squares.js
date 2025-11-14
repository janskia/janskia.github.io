// Tweak these parameters as you like:
var iterations = 7;

var minColor = 70;
var maxColor= 255;
var a = 35;
var brightnessDriftMaxValue = 50;

var colorJumpChance = 0;
var colorJumpMaxValue = 20;

var offsetMultiplicationChance = 1.2;
var offsetMultiplier = 2;

var offsetAddChance = 1.2;
var offsetAddValue = 40;

var offsetXAddChance = 1.34;
var offsetXAddValue = 55;

var offsetYAddChance = 10;
var offsetYAddValue = 125;
// -------

var currentGeneration = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    regenerate();
}

var loopCount = 0;

function draw(){
   var nextGeneration= [];
   for(var i = 0; i < currentGeneration.length; i++){
      var rectFract = currentGeneration[i];
      rectFract.draw1();
      var nextGenerationPartial = rectFract.getNextGeneration(rectFract.rect1.col);
      nextGenerationPartial.forEach(x => nextGeneration.push(x));
   }
   currentGeneration = nextGeneration;
   
   loopCount++;
   if(loopCount > iterations){
     noLoop();
   }
}

function mousePressed(){
  regenerate();
}

function regenerate(){
  clear();
  background(10,10,10);
  currentGeneration = [];
  currentGeneration.push(new RectFract(width / 2, height / 2, 300, new Color(random(minColor, maxColor), random(minColor, maxColor), random(minColor, maxColor), a)));
  loopCount = 0;
  loop();
}

class Rect{
  offsetX;
  offsetY;
  size;
  col;
  shape;
  
  constructor(offsetX, offsetY, size, col){
    this.col = col;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.size = size;
    
    this.shape = new Shape([
      new Point(this.offsetX - this.size/2, this.offsetY - this.size/2),
      new Point(this.offsetX + this.size/2, this.offsetY - this.size/2),
      new Point(this.offsetX + this.size/2, this.offsetY + this.size/2),
      new Point(this.offsetX - this.size/2, this.offsetY + this.size/2)
    ]);
  }
   
  draw(){
    this.shape.drawFilled(this.col.getCol());
  }
}

class RectFract{
  rect1;
  
  constructor(offsetX, offsetY, size, col){
    this.rect1 = new Rect(offsetX, offsetY, size, col);
  }
  
  draw1(){
    this.rect1.draw();
  }
  
  getNextGeneration(col){
      var nextGeneration = [];
      var offset = this.rect1.size/2;
      
      var rnd = random(0, 100);
      if(rnd <= offsetMultiplicationChance){
        offset *= offsetMultiplier;
      }
    
      rnd = random(0, 100);
      if(rnd <= offsetAddChance){
        offset += offsetAddValue;
      }
    
      var newOffsetX = offset;
      var newOffsetY = offset;
    
      rnd = random(0, 100);
      if(rnd <= offsetXAddChance){
        newOffsetX += offsetXAddValue;
      }
    
      rnd = random(0, 100);
      if(rnd <= offsetYAddChance){
        newOffsetY += offsetYAddValue;
      }
    
      rnd = random(0, 100);
      if(rnd <= colorJumpChance){
        col = col.addRGB(random(-colorJumpMaxValue, colorJumpMaxValue), random(-colorJumpMaxValue, colorJumpMaxValue), random(-colorJumpMaxValue, colorJumpMaxValue));
      }
    
      nextGeneration.push(new RectFract(this.rect1.offsetX + newOffsetX, this.rect1.offsetY, this.rect1.size/2, col.add(random(-brightnessDriftMaxValue, brightnessDriftMaxValue))));
      nextGeneration.push(new RectFract(this.rect1.offsetX - newOffsetX, this.rect1.offsetY, this.rect1.size/2, col.add(random(-brightnessDriftMaxValue, brightnessDriftMaxValue))));
      nextGeneration.push(new RectFract(this.rect1.offsetX, this.rect1.offsetY + newOffsetY, this.rect1.size/2, col.add(random(-brightnessDriftMaxValue, brightnessDriftMaxValue))));
      nextGeneration.push(new RectFract(this.rect1.offsetX, this.rect1.offsetY - newOffsetY, this.rect1.size/2, col.add(random(-brightnessDriftMaxValue, brightnessDriftMaxValue))));
      return nextGeneration;
   }
}

class Point{
  x;
  y;
  
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Shape{
  vertices = [];
  
  constructor(vertices){
     this.vertices = vertices;
  }
  
  drawRandomLine(col){
    stroke(col);
    var p1 = selectRandomPoint();
    var p2 = selectRandomPoint();
    
    line(p1.x, p1.y, p2.x, p2.y); 
  }
    
  drawFilled(col){
    noStroke();
    fill(col);
    beginShape();
    for(var i=0; i < this.vertices.length; i++){
      var vertice = this.vertices[i];
      vertex(vertice.x, vertice.y);
    }
    endShape();
  }
  
  selectRandomPoint(){
    var vertice = floor(random(0, vertices.length));
    var v1 = vertices[vertice];
    var v2 = vertices[(vertice + 1) % vertices.length];
    var lerpVal = random(0,1);
    return new Point(lerp(v1.x, v2.x, lerpVal), lerp(v1.y, v2.y, lerpVal));
  }
}

class Color{
  r;
  g;
  b;
  a;
  
  constructor(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  
  getRandom(min, max, alpha){
   return new Color(random(min,max), random(min,max), random(min,max), alpha);
  }

  addRGB(r, g, b){
    return new Color(this.r + r, this.g + g, this.b + b, this.a);
  }
  
  add(val){
    return new Color(this.r + val, this.g + val, this.b + val, this.a);
  }
  
  getCol(){
    return color(this.r, this.g, this.b, this.a);
  }
  
  clamp(){
   if(this.r < 0){
     this.r = 0;
   }
   if(this.g < 0){
     this.g = 0;
   }
   if(this.b < 0){
     this.b = 0;
   }
   if(this.a < 0){
     this.a = 0;
   }
  }
}