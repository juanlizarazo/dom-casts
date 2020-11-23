import "./portal.scss";

const TOTAL_ANIMATION_FRAMES = 12;
const TEN_FRAMES_PER_SECOND = 100;

export class Portal {
  x = 1;
  y = 1;
  #portalElement = document.createElement("div");

  constructor() {
    this.x = this.#getRandomIndex();
    this.y = this.#getRandomIndex();
  }

  render() {
    this.#portalElement.classList.add("portal", "portal-1");
    this.#portalElement.style.cssText = `
        left: ${this.x * 50}px;
        top : ${this.y * 50}px;
    `;

    const rootElement = document.getElementById("root");
    rootElement.appendChild(this.#portalElement);

    this.#animate();
  }

  destroy() {
    this.#portalElement.remove();
  }

  #animate() {
    let frame = 1;

    const animate = () => {
      this.#portalElement.classList.remove(`portal-${frame}`);

      if (frame === TOTAL_ANIMATION_FRAMES) {
        frame = 1;
      }

      frame = frame + 1;
      this.#portalElement.classList.add(`portal-${frame}`);

      setTimeout(() => {
        window.requestAnimationFrame(() => animate());
      }, TEN_FRAMES_PER_SECOND);
    };

    animate();
  }

  #getRandomIndex() {
    const minIndex = 1;
    const maxIndex = 11;
    const index = Math.random() * (maxIndex - minIndex) + 1;
    const roundedIndex = Math.floor(index);

    if (roundedIndex % 2 === 0) {
      return roundedIndex + 1;
    }

    return roundedIndex;
  }
}
