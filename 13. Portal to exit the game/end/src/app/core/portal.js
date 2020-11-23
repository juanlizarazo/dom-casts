import "./portal.scss";

export class Portal {
  x = 1;
  y = 1;
  #portalElement = document.createElement("div");

  constructor() {
    this.x = this.#getRandomIndex();
    this.y = this.#getRandomIndex();
  }

  render() {
    this.#portalElement.classList.add("portal");
    this.#portalElement.style.cssText = `
        left: ${this.x * 50}px;
        top : ${this.y * 50}px;
    `;

    const rootElement = document.getElementById("root");
    rootElement.appendChild(this.#portalElement);
  }

  destroy() {
    this.#portalElement.remove();
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
