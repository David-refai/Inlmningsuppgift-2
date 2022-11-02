import { canvas, ctx } from "./config.js";

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.score = 10;
    const image = new Image();
    image.src = "./src/image/spaceship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
    };
  }


  increaseScore() {
    this.score++;
  }

  decreaseScore() {
    this.score--;
  }
 

  getScore() {
    return this.score;
  }

  _draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.image) this._draw();
    this.position.y += this.velocity.y;
  }


  colliedWithBottomCanvas() {
   if(this.position.y + this.height + 10 > canvas.height){
       this.position.y = canvas.height - this.height - 10;
       this.velocity.y = 0;
   }
  }

  colliedWithProjectile(projectile) {
    if (
      projectile.position.x > this.position.x &&
      projectile.position.x < this.position.x + this.width &&
      projectile.position.y > this.position.y &&
      projectile.position.y < this.position.y + this.height
    ) {
      this.decreaseScore();
      return true;
        }
  }

  colliedWithEnemy(enemy) {
    if (
      enemy.position.x > this.position.x &&
      enemy.position.x < this.position.x + this.width &&
      enemy.position.y > this.position.y &&
      enemy.position.y < this.position.y + this.height
    ) {
      this.decreaseScore();
      return true;
    }
  }


}

export default Player;
