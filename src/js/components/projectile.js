    import {ctx} from "../config.js";

class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;

        this.radius = 5;
      
        
    }
  
    draw(){
        ctx.beginPath();
        ctx.fillStyle =  "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    rerenderGame(){
        if (this.position.y < -this.height) {
            this.position.y = canvas.height - 10;
          }
          if (this.position.y > canvas.height) {
            this.position.y = -this.height;
          }

            this.update();
    }


}

export default Projectile;