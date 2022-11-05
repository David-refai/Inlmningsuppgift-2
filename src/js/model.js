import Enemy from "./components/enemy.js";
import { playerOne, playerTwo, canvas, ENEMY_SPEED, ENEMY_DENSITY } from "./config.js";
import Projectile from "./components/projectile.js";


/**
 * @file - The file that contains the state of the game
 * @function - The function that is called
 * @param {object} Player - The object that is called
 *
*/



export const state = {
  players: [playerOne, playerTwo],
  enemies: [],
  projectiles: [],
};


export const playerVelocity = function () {
  state.players[0].position.y += state.players[0].velocity.y;
  state.players[1].position.y += state.players[1].velocity.y;
};

//? Enemy Movement
export const createAndPushEnemy = function () {
  //? function to create enemy
  if (Math.random() < ENEMY_DENSITY) {
    //? 1. Create enemy as coming from the left side of the canvas
    const enemyLeftSide = new Enemy(
      { x: canvas.width + 100, y: Math.random() * canvas.height - 150 },
      { x: -ENEMY_SPEED, y: 0 }
    );
    state.enemies.push(enemyLeftSide);

    //? 2. Create enemy as coming from the right side of the canvas
    const enemyRightSide = new Enemy(
      { x: 0, y: Math.random() * canvas.height - 150 },
      { x: ENEMY_SPEED, y: 0 }
    );
    state.enemies.push(enemyRightSide);
  }
};

//* function to draw the projectiles
export const loopProjectiles = function (player) {
  //? 2. Draw the projectiles
  for (let j = 0; j < state.projectiles.length; j++) {
    let projectile = state.projectiles[j];
    projectile.update();

    //? 3. Check for collision between projectiles and enemies
    if (player.colliedWithProjectile(projectile)) {

      //? this function will modify the position of player,
      //? when it collides with the projectile, enemy and top of the canvas
      player.playerPosition();
      state.projectiles.splice(j, 1);

      /**
       * @condition - if the player's shot hits the another player, the score will be increased by 1, and the second player will be moved to the bottom of the canvas and lose 1 life  
       * @score - the score of the player   
       * */
      // if (player === state.players[0]) {
      //   state.players[1].increaseScore();
      //   player.decreaseScore(1);
      // } else {
      //   state.players[0].increaseScore();
      //   player.decreaseScore(1);
      // }
    }
  }
};

//* function to draw the enemies
export const loopEnemies = function (player) {
  //? 1. Create enemies
  createAndPushEnemy();

  //? 2. Draw the enemies
  for (let i = 0; i < state.enemies.length; i++) {
    state.enemies[i].update();

    if (player.colliedWithEnemy(state.enemies[i]) === true) {
      player.playerPosition();
      state.enemies.splice(i, 1);

      //? if the player collides with the enemy, the score will be decreased by 1.
      // player.decreaseScore(1);
    }
  }
};


/**
 * 
 * @param {player} player 
 * @param {x: , y:} velocity 
 * This function pushes the projectiles into the state
 */
export const createProjectiles = function (player, velocity) {
  state.projectiles.push(
    new Projectile({
      position: {
        x: player.position.x + player.width / 2,
        y: player.position.y,
      },
      velocity: velocity,
    })
  );
};


/**
 * @function - init - The function that is called to initialize the game  
 * @param {Player} Player
 */

export const init = function () {
  //? 1. Draw the player
  state.players.forEach((player) => {
    player.update();

    //? 2. Draw the projectiles
    loopProjectiles(player);

    //? 3. Draw the enemies
    loopEnemies(player);

    //? 4. Check for collision between player and top of the canvas
    if (player.colliedWithTopCanvas()) {
      player.playerPosition();
      player.increaseScore();
    }
   //? 5. Check for collision between player and bottom of the canvas
    if (player.colliedWithBottomCanvas()) {
      return true;
    }
  });
};
