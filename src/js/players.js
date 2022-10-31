import { canvas, ctx } from "./config.js";

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.score = 0;
    const image = new Image();
    image.src = "./src/image/spaceship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
    };
  }

  draw() {
    if (this.image)
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }

  colliedWithEnemy(enemy) {
    if (
      this.position.x < enemy.position.x + enemy.radius - 20 &&
      this.position.x + this.width - 20 > enemy.position.x &&
      this.position.y < enemy.position.y + enemy.radius &&
      this.position.y + this.height > enemy.position.y
    ) {
      return true;
    }
  }
}

export default Player;
