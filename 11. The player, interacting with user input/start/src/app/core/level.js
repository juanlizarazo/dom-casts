import "./level.scss";
import { LevelItem } from "./level-item";
import { levelItemType } from "./constants";

const LEVEL_WIDTH = 13;
const LEVEL_HEIGHT = 13;

export class Level {
  #columns = [];
  #levelElement = document.createElement("div");
  #rootElement = document.getElementById("root");

  render() {
    const createLevelItem = () => {
      return new LevelItem();
    };
    const createCellGroup = (column) => {
      return new Array(LEVEL_HEIGHT).fill(null).map(createLevelItem);
    };

    this.#columns = new Array(LEVEL_WIDTH).fill(null).map(createCellGroup);

    this.#initializeWalls();

    this.#columns.forEach((column, columnIndex) => {
      const columnElement = document.createElement("div");

      column.forEach((cell, cellIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");

        switch (cell.type) {
          case levelItemType.OUTER_WALL: {
            cellElement.classList.add("outer-wall");
            break;
          }

          case levelItemType.HARD_WALL: {
            cellElement.classList.add("hard-wall");
            break;
          }
        }

        columnElement.appendChild(cellElement);
      });

      this.#levelElement.appendChild(columnElement);
    });

    this.#levelElement.classList.add("level");

    this.#rootElement.appendChild(this.#levelElement);
  }

  armBomb() {
    // TODO:
    // Place the bomb on the level
    // Detonate it
    // Destroy the SOFT_WALLs around it!
  }

  canMove() {}

  destroy() {}

  #initializeWalls() {
    this.#columns.forEach((column, columnIndex) => {
      const isFirstColumn = columnIndex === 0;
      const isLastColumn = columnIndex === LEVEL_WIDTH - 1;

      column.forEach((cell, cellIndex) => {
        if (cellIndex === 6 && columnIndex === 6) {
          return;
        }

        const isFirstRow = cellIndex === 0;
        const isLastRow = cellIndex === LEVEL_HEIGHT - 1;
        const isHardWall = columnIndex % 2 === 0 && cellIndex % 2 === 0;

        if (isFirstColumn || isLastColumn || isFirstRow || isLastRow) {
          cell.type = levelItemType.OUTER_WALL;
        } else if (isHardWall) {
          cell.type = levelItemType.HARD_WALL;
        }
      });
    });

    console.log(this.#columns);
  }
}
