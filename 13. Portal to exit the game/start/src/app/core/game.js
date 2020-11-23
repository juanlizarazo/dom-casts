import { Player } from "./player";
import { Level } from "./level";
import { keyEventToDirection, SPACE_KEY_FROM_EVENT } from "./constants";

export class Game {
  #level = new Level();
  #player = new Player();

  init() {
    this.#addKeyListener();
    this.#level.render();
    this.#player.render();
  }

  #addKeyListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key === SPACE_KEY_FROM_EVENT) {
        this.#level.armBomb(this.#player.x, this.#player.y);
        return;
      }

      const direction = keyEventToDirection[event.key];

      if (!direction) {
        return;
      }

      const canMove = this.#level.canMove(
        direction,
        this.#player.x,
        this.#player.y
      );

      this.#player.move(direction, canMove);
    });
  }
}
