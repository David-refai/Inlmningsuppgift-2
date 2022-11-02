import { canvas, ctx } from "./config.js";
import Enemy from "./enemy.js";
import Controls from "./control.js";
import { playerOne, playerTwo, players, projectiles } from "./config.js";
import { scoreDrawing } from "./help.js";

const enemies = [];
//? function to control the player
new Controls();

const createAndPushEnemy = function () {
  //? function to create enemy
  if (Math.random() < 0.02) {
    //? 1. Create enemy as coming from the left side of the canvas
    const enemyLeftSide = new Enemy(
      { x: canvas.width + 100, y: Math.random() * canvas.height - 150 },
      { x: -1, y: 0 }
    );
    enemies.push(enemyLeftSide);

    //? 2. Create enemy as coming from the right side of the canvas
    const enemyRightSide = new Enemy(
      { x: 0, y: Math.random() * canvas.height - 150 },
      { x: 1, y: 0 }
    );
    enemies.push(enemyRightSide);
  }
};



//* function to draw the projectiles
const loopProjectiles = function (player) {
  //? 2. Draw the projectiles
  for (let j = 0; j < projectiles.length; j++) {
    let projectile = projectiles[j];
    projectile.update();

    //? 3. Check for collision between projectiles and enemies
    if (player.colliedWithProjectile(projectile)) {
      player.position.y = -player.height - 10;

      projectiles.splice(j, 1);

      // player.decreaseScore();
    }
  }
};

//* function to draw the enemies
const loopEnemies = function (player) {
  //? 1. Create enemies
  createAndPushEnemy();

  //? 2. Draw the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();

    if (player.colliedWithEnemy(enemies[i])) {
      player.position.y = -player.height - 10;

      //! score
      // player.decreaseScore();
    }
  }
};

//? 4. Check for collision between projectiles and enemies

const init = function () {
  //? 1. Draw the player
  players.forEach((player) => {
    player.update();

    //? 2. Draw the projectiles
    loopProjectiles(player);

    //? 4. Check for collision between enemies and player
    loopEnemies(player);

    //? 5. Check for collision between canvas and player, if true, return the player to the bottom of the canvas
    if (player.position.y < -player.height) {
      player.position.y = canvas.height - 10;

      //! score
      player.increaseScore();
    }
    //? 6. method for not letting the player go out of the canvas
    if (player.colliedWithBottomCanvas()) {
      return true;
    }
  });
};

//? function to animate the canvas
export const startGame = function () {
  requestAnimationFrame(startGame);
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  init();
  scoreDrawing(playerOne, playerTwo);
  playerOne.position.y += playerOne.velocity.y;
  playerTwo.position.y += playerTwo.velocity.y;
};
