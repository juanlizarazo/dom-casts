import { Player } from "./player";
import { Level } from "./level";
import { keyEventToDirection, SPACE_KEY_FROM_EVENT } from "./constants";
import { Portal } from "./portal";
import { ExitScreen } from "./exit-screen";
import { SplashScreen } from "./splash-screen";
import soundtrackAudio from "../../assets/soundtrack.mp3";
import armBombAudio from "../../assets/arm-bomb.mp3";
import explosionAudio from "../../assets/explosion.mp3";
import exitAudio from "../../assets/exit.mp3";

export class Game {
  #level = new Level();
  #player = new Player();
  #portal = new Portal();
  #exitScreen = new ExitScreen();
  #splashScreen = new SplashScreen();
  #handleKeydown = (event) => undefined;
  #inGamePlay = false;
  #audio = {
    game: {
      audioElement: document.createElement("audio"),
      sourceElement: document.createElement("source"),
    },
    bomb: {
      audioElement: document.createElement("audio"),
      sourceElement: document.createElement("source"),
    },
    explosion: {
      audioElement: document.createElement("audio"),
      sourceElement: document.createElement("source"),
    },
    exit: {
      audioElement: document.createElement("audio"),
      sourceElement: document.createElement("source"),
    },
  };

  init() {
    this.#addKeyListener();
    this.#splashScreen.render();
    this.#startSoundEffects();
  }

  #start() {
    this.#level.render();
    this.#player.render();
    this.#portal.render();

    this.#audio.game.audioElement.play();
  }

  #startSoundEffects() {
    this.#audio.game.sourceElement.src = soundtrackAudio;
    this.#audio.game.sourceElement.type = "audio/mpeg";
    this.#audio.game.audioElement.setAttribute("loop", "");
    this.#audio.game.audioElement.setAttribute("autoplay", "");
    this.#audio.game.audioElement.appendChild(this.#audio.game.sourceElement);

    this.#audio.bomb.sourceElement.src = armBombAudio;
    this.#audio.bomb.sourceElement.type = "audio/mpeg";
    this.#audio.bomb.audioElement.appendChild(this.#audio.bomb.sourceElement);

    this.#audio.explosion.sourceElement.src = explosionAudio;
    this.#audio.explosion.sourceElement.type = "audio/mpeg";
    this.#audio.explosion.audioElement.appendChild(
      this.#audio.explosion.sourceElement
    );

    this.#audio.exit.sourceElement.src = exitAudio;
    this.#audio.exit.sourceElement.type = "audio/mpeg";
    this.#audio.exit.audioElement.appendChild(this.#audio.exit.sourceElement);

    const rootElement = document.getElementById("root");

    rootElement.appendChild(this.#audio.game.audioElement);
    rootElement.appendChild(this.#audio.bomb.audioElement);
  }

  #addKeyListener() {
    this.#handleKeydown = (event) => {
      if (this.#inGamePlay === false) {
        this.#start();
        this.#splashScreen.destroy();
        this.#inGamePlay = true;
        return;
      }

      if (event.key === SPACE_KEY_FROM_EVENT) {
        this.#level.armBomb(this.#player.x, this.#player.y, () => {
          this.#audio.explosion.audioElement.play();
        });

        this.#audio.bomb.audioElement.play();

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

    this.#audio.game.audioElement.pause();
    this.#audio.exit.audioElement.play();
  }
}
