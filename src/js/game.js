import Player from "./players.js";
import { canvas, ctx } from "./config.js";
import Enemy from "./enemy.js";


canvas.width = innerWidth
canvas.height = innerHeight;

    // this.position.x = canvas.width / 2 - this.width / 2;
          // this.position.y = canvas.height - this.height - 10;
const enemyLeftSide = new Enemy({x: 100, y: 100});
const enemyRightSide = new Enemy({x: 500, y: 100});

const playerOne = new Player({x: canvas.width - (canvas.width /3) , y: canvas.height- 50});
const playerTwo = new Player( {x: canvas.width  / 3, y: canvas.height - 50});

const players = [playerOne, playerTwo];
const enemies = [];

const enemyLoop = function() {
     if(Math.random() < 0.06) {
            const enemyLeftSide = new Enemy({x:  canvas.width + 100 , y: Math.random() * canvas.height - 150}, {x: -1, y: 0});
            enemies.push(enemyLeftSide);
            const enemyRightSide = new Enemy({x: 0, y: Math.random() * canvas.height - 150 } , {x: 1, y: 0});
            enemies.push(enemyRightSide);
        }

        enemies.forEach((enemy, index) => {
            // enemy.draw(ctx);
            enemy.update(ctx);
       
        });
}


console.log(enemies);



const gameLoop = function() {
    
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // enemyLeftSide.draw(ctx);
    players.forEach((player) => {
        player.draw(ctx);
        
    });

    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Amanda 1", canvas.width / 3, 50);
    ctx.fillText("Noura 2", canvas.width - (canvas.width / 3), 50);


    
    enemyLoop();
    // enemyLeftSide.draw(ctx);
    // enemyRightSide.draw(ctx);
        // console.log(enemyLeftSide);
        
}
gameLoop();