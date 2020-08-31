let sizeX = 800,
    sizeY = 800;
let points = []

// the line youre looking for is 151, read the comments there
// and come back for more after

class Point {
  
  constructor(x, y) {
    
    this.vector = createVector(x, y);
    this.colour = createVector(255, 255, 255);
    this.radius = 5;
    this.projectedX = sizeX / 2 + this.vector.x;
    this.projectedY = sizeY / 2 - this.vector.y;
    this.shouldRender = true;
    points.push(this);
    
  }
  
  update() {
    
    this.projectedX = sizeX / 2 + this.vector.x;
    this.projectedY = sizeY / 2 - this.vector.y
    
  }
  render() {
    
    if (this.shouldRender) {
      fill(this.colour.x, this.colour.y, this.colour.z);
      strokeWeight(1);
      stroke(255 - this.colour.x, 255 - this.colour.y, 255 - this.colour.z);
      ellipse(this.projectedX, this.projectedY, this.radius);
    }
    
  }
  coord() {
    
    fill(80, 80, 80);
    text(`(${this.vector.x}, ${this.vector.y})`, this.projectedX, this.projectedY + 15);
    
  }
}


function setup() {
  // SETUP
  createCanvas(sizeX, sizeY);
  textSize(10);
  background(220);
  strokeWeight(1)
  stroke(180, 180, 180);
  for (let i = 0; i < sizeX; i += 10) line(i, 0, i, sizeY);
  for (let i = 0; i < sizeY; i += 10) line(0, i, sizeX, i);
  stroke(120, 120, 120);
  strokeWeight(3);
  line(sizeX / 2, 0, sizeX / 2, sizeY);
  line(0, sizeY / 2, sizeX, sizeY / 2);
  fill(255, 0, 0)
  for (let point of points) {
    point.update();
    point.render();
  }
  let resolution = [];
  for (let i = 0; i < sizeX; i+=0.01) resolution.push(sizeX / 2 - i);
  
  stroke(255, 0, 0); //stroke will set the colour of the lines of the graph
  drawGraph(resolution, equation, true, false, 1);
}


function equation(x) {
  return (x/40)**3;
}

function draw() {}

function addPoint(x, y) {
  return new Point(x, y);
}

function drawLine(p1, p2) {
  line(p1.projectedX, p1.projectedY, p2.projectedX, p2.projectedY);
}

function drawGraph(xResolution, func, isLines, isPoints, zoom=1) {
  let equationPoints = [];
  var prevPoint;
  strokeWeight(2);
  for (let x of xResolution) {
    let p = addPoint(x*zoom, func(x)*zoom)
    p.radius = 5;
    if(isPoints) p.render();
    if (isLines) if (prevPoint !== undefined) drawLine(p, prevPoint);
    prevPoint = p;
    equationPoints.push(p);
  }
  return equationPoints;
}