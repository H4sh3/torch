class Block{
    constructor(pos,size){
      if(pos){
        this.pos = pos
      }else{ 
        this.pos = createVector(random(width), random(height));
      }
  
      if(size){
        this.size = size
      }else{
        this.size = 5;
      }
    }
  
    update() {}
  
    draw() {}
  }