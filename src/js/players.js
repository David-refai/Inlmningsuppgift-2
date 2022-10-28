
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
export default class Player {
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
    image.src = "../image/spaceship.png";
    image.onload = () => {
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    }

    // this.color = color;
    this.dx = 2;
    this.dy = 2;


    this.score = 0;
  }

  draw() {
    if(this.image) 
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    // console.log("draw");
    
    // ctx.beginPath();
   
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    // ctx.closePath();
  }

  update() {
    // this.draw();

    this.position.x += this.dx;
    this.position.y += this.dy;
  }
  
}


