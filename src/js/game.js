import { canvas, ctx } from "./config.js";
import Controls from "./components/control.js";
import { playerOne, playerTwo} from "./config.js";
import { scoreDrawing } from "./helpers.js";
import * as model from "./model.js";



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
