import * as model from "../model.js";

import { TIMEOUT_SEC } from "../config.js";

class Controls {
  _map = {};
  constructor() {
    this._map = {
      KeyW: "up",
      KeyS: "down",
      KeyX: "space",
      ArrowUp: "up2",
      ArrowDown: "down2",
      Space: "space2",
    };
    this.playerOne = model.state.players[0];
    this.playerTwo = model.state.players[1];
    this.TimeToFire = true;
    this.TimeToFire2 = true;

    document.addEventListener("keydown", this._keyDownHandler.bind(this));
    document.addEventListener("keyup", this._keyUpHandler.bind(this));
  }

  _timePress() {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, TIMEOUT_SEC);
    })
  }

  _keyDownHandler(event) {
    const key = event.code;
    const player = this._map[key];
    if (player === "up") {
      this.playerOne.velocity.y = -1;
    }
    if (player === "up2") {
      this.playerTwo.velocity.y = -1;
    }
    if (player === "down") {
      this.playerOne.velocity.y = 1;
    }
    if (player === "down2") {
      this.playerTwo.velocity.y = 1;
    }

    if (player === "space" && this.TimeToFire) {
      this.TimeToFire = false;
      model.createProjectiles(this.playerOne, { x: 5, y: 0 });
      this._timePress().then(() => this.TimeToFire = true);
    }
    if (player === "space2" && this.TimeToFire2) {
      this.TimeToFire2 = false;
      model.createProjectiles(this.playerTwo, { x: -5, y: 0 });
      this._timePress().then(() => this.TimeToFire2 = true);
    }
  }

  _keyUpHandler(event) {
    const key = event.code;
    const player = this._map[key];
    if (player === "up") {
      this.playerOne.velocity.y = 0;
    }
    if (player === "up2") {
      this.playerTwo.velocity.y = 0;
    }
    if (player === "down") {
      this.playerOne.velocity.y = 0;
    }
    if (player === "down2") {
      this.playerTwo.velocity.y = 0;
    }
  }
}

export default Controls;
