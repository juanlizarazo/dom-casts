const MAX_FRAMES = 2;
const HALF_SECOND = 500;

class SplashScreen {
  #splashElement = document.createElement("div");
  #animation = null;

  render() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .splash-screen {
        background: url('../assets/splash-screen.jpg') no-repeat;
        width: 650px;
        height: 650px;
      }

      .splash-screen-1 {
        background-position-x: 0;
      }

      .splash-screen-2 {
        background-position-x: -650px;
      }
    `;
    document.head.appendChild(styleElement);

    this.#splashElement.classList.add("splash-screen", "splash-screen-1");

    const rootElement = document.getElementById("root");
    rootElement.appendChild(this.#splashElement);

    this.#animate();
  }

  destroy() {
    this.#splashElement.remove();
    window.clearInterval(this.#animation);
  }

  #animate() {
    let frame = 1;

    const animate = () => {
      this.#splashElement.classList.remove(`splash-screen-${frame}`);

      frame++;

      if (frame > MAX_FRAMES) {
        frame = 1;
      }

      this.#splashElement.classList.add(`splash-screen-${frame}`);
    };

    this.#animation = setInterval(animate, HALF_SECOND);
  }
}
