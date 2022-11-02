import Player from "./players.js";

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

export const players = [playerOne, playerTwo];
export const projectiles = [];
