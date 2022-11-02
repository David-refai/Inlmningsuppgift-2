import { players, projectiles } from "./config.js";
import Projectile from "./projectile.js";

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
    this.playerOne = players[0];
    this.playerTwo = players[1];
    this.TimeToFire = true;
    this.TimeToFire2 = true;

    document.addEventListener("keydown", this._keyDownHandler.bind(this));
    document.addEventListener("keyup", this._keyUpHandler.bind(this));
  }

  _setTimerOne() {
    setTimeout(() => {
      this.TimeToFire = true;
    }, 3000);
  }

  _setTimerTow() {
    setTimeout(() => {
      this.TimeToFire2 = true;
    }, 3000);
  }

  _createProjectiles(player, velocity) {
    projectiles.push(new Projectile({
      position: {
        x: player.position.x + player.width / 2,
        y: player.position.y,
      },
      velocity: velocity,
    }));
   
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
      this._createProjectiles(this.playerOne, { x: 3, y: 0 });
      this._setTimerOne();
      this.TimeToFire = false;
    }
    if (player === "space2" && this.TimeToFire2) {
      this._createProjectiles(this.playerTwo, { x: -3, y: 0 });

      this._setTimerTow();
      this.TimeToFire2 = false;
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
