import { Player } from "./player";
import { Level } from "./level";
import { keyEventToDirection, SPACE_KEY_FROM_EVENT } from "./constants";
import { Portal } from "./portal";
import { ExitScreen } from "./exit-screen";

export class Game {
  #level = new Level();
  #player = new Player();
  #portal = new Portal();
  #exitScreen = new ExitScreen();
  #handleKeydown = (event) => undefined;

  init() {
    this.#addKeyListener();
    this.#level.render();
    this.#player.render();
    this.#portal.render();
  }

  #addKeyListener() {
    this.#handleKeydown = (event) => {
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

      if (
        this.#player.x === this.#portal.x &&
        this.#player.y === this.#portal.y
      ) {
        this.#exitGame();
      }
    };

    document.addEventListener("keydown", this.#handleKeydown);
  }

  #removeKeyListener() {
    document.removeEventListener("keydown", this.#handleKeydown);
  }

  #exitGame() {
    this.#removeKeyListener();
    this.#level.destroy();
    this.#player.destroy();
    this.#portal.destroy();
    this.#exitScreen.render();
  }
}
