import { canvas, ctx } from "./config.js";
import * as model from "./model.js";

//? function to draw the score on the canvas, and the score is updated in the players.js file
export const scoreDrawing = function () {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + model.state.players[0].score, 20, 50);
  ctx.fillText(
    "Score: " + model.state.players[1].score,
    canvas.width - 150,
    50
  );

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height - canvas.height / 3);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
};
