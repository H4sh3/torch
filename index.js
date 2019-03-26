
let objs = [];
let cursor;
let player;
let torch;
let centerLine;

function setup() {
  createCanvas(1300, 900).parent('jsCanvas');;
  background(255, 112, 84);
  cursor = new Cursor();
  player = new Player();
  torch = new Torch();
  objs.push(torch);
  objs.push(cursor);
  objs.push(player);
  objs.push(new Block())
  objs.push(new Block())
  for(let i = 0; i < 10; i++){
    objs.push(new Enemy())
  }
}

function draw() {
  background(255, 112, 84);
  objs.map(obj => obj.draw());
  objs.map(obj => obj.update());

  let other = objs.filter(o => !(o instanceof Enemy))
  let updatedEnemys = objs.filter(o => o instanceof Enemy && o.alive).map(enemy => {
    if(enemy.pos.dist(torch.pos) < (enemy.size+torch.size)/2){
      enemy.health -= 10;
    }
    return enemy
  })

  objs = [...other,...updatedEnemys]
  
}

class Enemy extends Block {
  constructor(){
    super(createVector(random(width),random(height)),20)
    this.health = 200;
    this.alive = true;
  }

  draw(){
    fill(0,255,0)
    ellipse(this.pos.x,this.pos.y,this.size,this.size)
  }

  update(){
    this.alive = this.health > 0;
  }
}

class Torch extends Block{
  constructor(){
    super()
  }
  
  update(){
    
  }
  
  draw(){
    let distToMouse = player.pos.dist(createVector(mouseX,mouseY))
    let red = map(distToMouse,500,0,120,255)
    fill(red, 0, 0)
    noStroke()
    let direction = cursor.pos.copy().sub(player.pos);
    let tv1 = direction.copy().rotate(-HALF_PI/4).add(player.pos);
    let tv2 = direction.copy().rotate(HALF_PI/4).add(player.pos)  
    this.tL = createVector(tv1.x,tv1.y);
    this.tR = createVector(tv2.x,tv2.y);
    this.bL = createVector(0,15);
    this.bR = createVector(0,-15);

    this.bR.rotate(direction.heading())
    this.bL.rotate(direction.heading())

    this.bR.add(player.pos); 
    this.bL.add(player.pos);
    this.size = createVector(mouseX,mouseY).dist(player.pos)*0.85
    quad(this.bL.x,this.bL.y,this.bR.x,this.bR.y,this.tL.x,this.tL.y,this.tR.x,this.tR.y)

    this.pos = this.tL.copy().add(this.tR).div(2)

    ellipse(this.pos.x,this.pos.y,this.size,)
  }
}

class Player extends Block{
  constructor(){
    super(createVector(mouseX,mouseY),42)
    this.acc = createVector();
    this.vel = createVector();
  }

  update() {
    if(this.bigDist()){
      this.handleAttraction();
      stroke(5)
    }
  }

  bigDist(){
    return this.pos.dist(cursor.pos) > 250;
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

class Cursor extends Block{
  constructor(){
    super(createVector(mouseX,mouseY));
  }

  update() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }

  draw() {
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }
}

