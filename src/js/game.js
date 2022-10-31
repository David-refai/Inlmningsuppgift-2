import Player from "./players.js";
import { canvas, ctx } from "./config.js";
import Enemy from "./enemy.js";
import Projectile from "./projectile.js";

canvas.width = innerWidth;
canvas.height = innerHeight;

const playerOne = new Player({
  x: canvas.width / 3,
  y: canvas.height - 50,
});
const playerTwo = new Player({
  x: canvas.width - canvas.width / 3,
  y: canvas.height - 50,
});

const players = [playerOne, playerTwo];
const enemies = [];
const projectiles = [];
let ball;




//? this method to push enemy to the array, and it will be called in the gameLoop
const init = function () {

  

  if (Math.random() < 0.06) {
    const enemyLeftSide = new Enemy(
      { x: canvas.width + 100, y: Math.random() * canvas.height - 150 },
      { x: -1, y: 0 }
    );
    enemies.push(enemyLeftSide);
    const enemyRightSide = new Enemy(
      { x: 0, y: Math.random() * canvas.height - 150 },
      { x: 1, y: 0 }
    );
    enemies.push(enemyRightSide);
  }

for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    players.forEach((player) => {
        if (player.colliedWithEnemy(enemies[i])) {
            player.position.y = -player.height;
        }
        });
  }
//   enemies.forEach((enemy) => {
//     enemy.update();
// });
  players.forEach((player) => {
    player.update();
     
    if (player.position.y < -player.height || player.position.y > canvas.height) {
      player.position.y = canvas.height - 50;
      player.score++;
      
    }

    if (player.position.y > canvas.height - 30) {
      player.position.y = -player.height;
     
      
    }
   
  
});
  projectiles.forEach((projectile) => {
    projectile.update();
    if (projectile.position.y < 0) {
      projectiles.splice(projectiles.indexOf(projectile), 1);
    }
  });
};

const draw = function () {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + playerOne.score, 20, 50);
  ctx.fillText("Score: " + playerTwo.score, canvas.width - 150, 50);

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height - canvas.height / 3);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
};

const map = {
  KeyW: "up",
  KeyS: "down",
  KeyX: "space",
  ArrowUp: "up2",
  ArrowDown: "down2",
  Space: "space2",
};

const keyDownHandler = function (event) {
  const key = event.code;
  const player = map[key];
  if (player === "up") {
    playerOne.velocity.y = -1;
  }
  if (player === "up2") {
    playerTwo.velocity.y = -1;
  }
  if (player === "down") {
    playerOne.velocity.y = 0.5;
  }
  if (player === "down2") {
    playerTwo.velocity.y = 0.5;
  }
  if (player === "space") {
    projectiles.push(
      new Projectile({
        position: {
          x: playerOne.position.x + playerOne.width / 2,
          y: playerOne.position.y,
        },
        velocity: { x: 0, y: -5 },
      })
    );
  }
  if (player === "space2") {
    projectiles.push(
      new Projectile({
        position: {
          x: playerTwo.position.x + playerTwo.width / 2,
          y: playerTwo.position.y,
        },
        velocity: { x: 0, y: -5 },
      })
    );
  }
};

const keyUpHandler = function (event) {
  const key = event.code;
  const player = map[key];
  if (player === "up") {
    playerOne.velocity.y = 0;
  }
  if (player === "up2") {
    playerTwo.velocity.y = 0;
  }
  if (player === "down") {
    playerOne.velocity.y = 0;
  }
  if (player === "down2") {
    playerTwo.velocity.y = 0;
  }
};

addEventListener("keydown", keyDownHandler);
addEventListener("keyup", keyUpHandler);

const gameLoop = function () {
  requestAnimationFrame(gameLoop);
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  init();
  draw();

  playerOne.position.y += playerOne.velocity.y;
  playerTwo.position.y += playerTwo.velocity.y;
};
gameLoop();
