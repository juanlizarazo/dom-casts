class SplashScreen {
  #splashElement = document.createElement("div");

  render() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .splash-screen {
        background: url('../assets/splash-screen.jpg');
        width: 650px;
        height: 650px;
      }
    `;
    document.head.appendChild(styleElement);

    this.#splashElement.classList.add("splash-screen");

    const rootElement = document.getElementById("root");
    rootElement.appendChild(this.#splashElement);
    debugger;
  }

  destroy() {
    this.#splashElement.remove();
  }
}
