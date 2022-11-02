import { canvas, ctx } from "./config.js";
import Controls from "./components/control.js";
import { playerOne, playerTwo} from "./config.js";
import { scoreDrawing } from "./helpers.js";
import * as model from "./model.js";

const name1 = document.querySelector(".name-player1");
const name2 = document.querySelector(".name-player2");

// const name1Input = prompt("Enter name for player 1");
// const name2Input = prompt("Enter name for player 2");

// name1.textContent = name1Input;
// name2.textContent = name2Input;

const btnSave = document.querySelector(".btn-save");


const storage = localStorage.getItem("name");

if (storage) {
  name1.textContent = storage;
  name2.textContent = storage;
}

btnSave.addEventListener("click", function () {
  const name1Input = prompt("Enter name for player 1");
  const name2Input = prompt("Enter name for player 2");

  name1.textContent = name1Input;
  name2.textContent = name2Input;

  localStorage.setItem("name", name1Input);
});




//? function to control the player
new Controls();



//? function to animate the canvas
export const startGame = function () {
  requestAnimationFrame(startGame);
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  model.init();
  scoreDrawing(playerOne, playerTwo);
   model.playerVelocity();
 
};
