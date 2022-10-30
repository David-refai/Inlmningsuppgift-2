import {canvas, ctx} from "./config.js";


class Player {

  constructor(position) {
      this.position = position;
      this.velocity = {
          x: 0,
          y: 0
      };
      const image = new Image();
      image.src = "./src/image/spaceship.png";
      image.onload = () => {
          const scale = 0.15;
          this.image = image;
          this.width = image.width * scale;
          this.height = image.height * scale;
          // this.position.x = canvas.width / 2 - this.width / 2;
          // this.position.y = canvas.height - this.height - 10;
          
      }
  }
  
      draw(ctx) {
     
          if(this.image)
              ctx.drawImage(
                  this.image,
                  this.position.x,
                  this.position.y,
                  this.width ,
                  this.height
                  );
              
                
  
          
  }
  
  }

  export default Player;