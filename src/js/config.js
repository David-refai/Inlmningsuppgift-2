import Player from "./components/players.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

export const playerOne = new Player({
  x: canvas.width / 4,
  y: canvas.height - 50,
});

export const playerTwo = new Player({
  x: canvas.width - canvas.width / 3,
  y: canvas.height - 50,
});


export const TIMEOUT_SEC = 3000;
export const ENEMY_DENSITY = 0.03;
export const ENEMY_SPEED = 3;
export const PROJECTILE_SPEED = 5;
export const PLAYER_SPEED = 3;
