numLines =1400;
size = 150;
xScale =3;
yScale=3;
offsetChance=0.003;
offsetSize=50;
offsetScale=72;

function setup() {
  generate();
}

function mouseClicked(){
 // fullscreen(true);
  generate();
}

function generate(){
   createCanvas(windowWidth, windowHeight).parent("p5");
   background(0);
   blendMode(ADD);
  
   var offsetX=0;
   var offsetY=0;
   var runtimeSize=size;
   var c = color(190,220,220);
   if(random(0,20) < 1){
     c = color(130,229,117);
   }
    
    for(var i = 0; i < numLines; i++)
    {
    if(random(0,8)){
      c.setAlpha(random(0,31));
      stroke(c);
    }
    strokeWeight(random(1,2));
    noFill();
    
    //var angle = random(0, 2 * PI);
    var angle = i/numLines*2*PI;
    var length = random(0, runtimeSize);
    var startOffset = random(runtimeSize*0.3,runtimeSize*0.3);
    
    var centerX = windowWidth/2;
    var centerY = windowHeight/2;
    
    if(random(0,1) < offsetChance)
    {
      translate(random(-offsetSize,offsetSize),random(-offsetSize,offsetSize));
      runtimeSize+=random(-offsetScale,offsetScale*1/2);
    }
    
    curve(centerX+sin(angle)*startOffset,
          centerY+cos(angle)*startOffset,
          centerX+sin(angle)*startOffset*xScale,
          centerY+cos(angle)*startOffset*yScale,
          centerX+sin(angle)*length, 
          centerY+cos(angle)*length,
          centerX+cos(angle),
          centerY+cos(angle)*runtimeSize*2);
  }
}