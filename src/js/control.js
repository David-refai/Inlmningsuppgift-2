const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// const img = document.querySelector("img");

canvas.height = innerHeight;
canvas.width = innerWidth;
class Player {
//   canvas = CANVAS
//   ctx = CTX;
    // canvasWidth = this.canvas.width;
    // canvasHeight = this.canvas.height;
constructor() {
    this.position = {
        x: 100,
        y: 100
    };
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
        
    }
}

    draw() {
   
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

 


const player = new Player();
// player.draw();
const animate = function() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
}

animate();






