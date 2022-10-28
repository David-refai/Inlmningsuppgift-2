

class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * (this.game.canvas.width - this.width);
        this.y = 0;
        this.speed = Math.random() * 3 + 1;
      
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}