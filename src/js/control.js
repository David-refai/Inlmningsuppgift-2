import { canvas } from "./config.js";
import { players, projectiles } from "./game.js";
import Projectile from "./projectile.js";

canvas.height = innerHeight;
canvas.width = innerWidth;


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
  _collidedWithCanvas(player) {
    if (player.position.y + player.height + 22 > canvas.height) {
        // player.position.y = canvas.height - player.height - 22;
        player.velocity.y = 0;

        }
        else{
            player.velocity.y = 1;
        }
        console.log(player.position.y + player.height + 21 >= canvas.height);
        console.log(canvas.height);
        
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
        this._collidedWithCanvas(this.playerOne);
        // this.playerOne.colliedWithBottom(); 
    // this.playerOne.position.y + this.playerOne.height + 22 < canvas.height ? this.playerOne.velocity.y = 1 : this.playerOne.velocity.y = 0;
    }
    if (player === "down2") {
        this._collidedWithCanvas(this.playerTwo);
        // this.playerTwo.colliedWithBottom();
    // this.playerTwo.position.y + this.playerTwo.height + 22 <= canvas.height ? this.playerTwo.velocity.y = 1 : this.playerTwo.velocity.y = 0;
 
    
    // this._collidedWithCanvas(this.playerTwo);
    }

    if (player === "space" && this.TimeToFire) {
      let projectile = 
        new Projectile({
          position: {
            x: this.playerOne.position.x + this.playerOne.width / 2,
            y: this.playerOne.position.y,
          },
          velocity: { x: 5, y: 0 },
        }
      );
        projectiles.push(projectile);
      this._setTimerOne();
      this.TimeToFire = false;
      
    }
    if (player === "space2" && this.TimeToFire2) {
      
       let projectile = new Projectile({
          position: {
            x: this.playerTwo.position.x + (this.playerTwo.width) / 2,
            y: this.playerTwo.position.y,
          },
          velocity: { x: -5, y: 0 },
        })
     
      this._setTimerTow();
      this.TimeToFire2 = false;
      projectiles.push(projectile);
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
