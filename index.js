
let objs = [];
let cursor;
let centerLine;

function setup() {
  createCanvas(1300, 900).parent('jsCanvas');;
  background(255, 112, 84);
  cursor = new Cursor();
  objs.push(new Player())
  objs.push(cursor);
  objs.push(new Block())
  objs.push(new Block())
}

function draw() {
  background(255, 112, 84);
  objs.map(obj => obj.draw());
  objs.map(obj => obj.update());
}


class Player{
  constructor(){
    this.pos = createVector(mouseX,mouseY);
    this.acc = createVector();
    this.vel = createVector();
    this.size = 42;
  }

  update() {
    if(this.bigDist()){
      this.handleAttraction();
      stroke(5)
      line(this.pos.x,this.pos.y,mouseX,mouseY)
    }
  }

  bigDist(){
    return this.pos.dist(cursor.pos) > 50;
  }
  
  handleAttraction(){
    this.acc = createVector(mouseX,mouseY).sub(this.pos);
    this.vel.add(this.acc);
    this.vel.limit(8);
    this.pos.add(this.vel);
  }

  draw() {
    noStroke();
    fill(153, 187, 255);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
}

class Block{
  constructor(){
    this.pos = createVector(random(width), random(height));
    this.size = 5;
  }

  update() {

  }

  draw() {
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }
}

class Cursor{
  constructor(){
    this.pos = createVector(mouseX,mouseY);
  }

  update() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }

  draw() {
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }
}