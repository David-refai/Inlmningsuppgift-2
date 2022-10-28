import Player from "./players.js";


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



const playerOne = new Player();
const playerTwo = new Player();
// const players = [playerOne, playerTwo];
const gameLoop = function() {
    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // players.forEach((player) => {
        //     console.log("player", player);
        //     player.draw(ctx);
        //     // player.update();
        // });
        
        // playerTwo.draw(ctx);
        requestAnimationFrame(gameLoop);
        playerOne.draw(ctx);
    // Start the game


    // Create a new player

    // Create a new enemy


    // Start the game loop



}
gameLoop();