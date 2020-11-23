import "./exit-screen.scss";

export class ExitScreen {
  render() {
    const exitScreenElement = document.createElement("div");

    exitScreenElement.classList.add("exit-screen");

    const rootElement = document.getElementById("root");
    rootElement.appendChild(exitScreenElement);
  }
}
