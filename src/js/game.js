import Player from "./players.js";
import { canvas, ctx } from "./config.js";
import Enemy from "./enemy.js";
import Controls from "./control.js";

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

export const players = [playerOne, playerTwo];
const enemies = [];
export const projectiles = [];

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
    // enemies[i].update();
    players.forEach((player) => {
      if (player.colliedWithEnemy(enemies[i])) {
        player.position.y = -player.height;
      }
    });

    for (let j = 0; j < projectiles.length; j++) {
      if (projectiles[j].collidedWithEnemy(enemies[i])) {
        enemies.splice(i, 1);
        projectiles.splice(j, 1);
      }
    }
  }

  players.forEach((player) => {
    player.update();

    if (player.position.y < -player.height) {
      player.position.y = canvas.height - 50;
      player.score++;
    }

    // if(player.position.y + player.height > canvas.height - 50){
    //     player.velocity.y = 0;
    //   }

    projectiles.forEach((projectile) => {
      projectile.update();

      if (playerOne.colliedWithProjectile(projectile)) {
        playerOne.position.y = -playerOne.height - 50;
      }
      if (playerTwo.colliedWithProjectile(projectile)) {
        playerTwo.position.y = -playerTwo.height - 50;
      }
    });
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
new Controls();
