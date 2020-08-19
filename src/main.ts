import './styles/main.scss';
import { GameField } from './game-field';
import { Cell } from './models';
import { wait } from './utils';

const ROWS_COUNT = 45;
const COLS_COUNT = 80;
const ITERATION_TIME = 30;

const visited: Cell[] = [];
const fieldContainer = document.querySelector('.dfs-field') as HTMLElement;
const gameField = new GameField(fieldContainer, ROWS_COUNT, COLS_COUNT);

const startCell = gameField.getRandomCell();
visited.push(startCell);

(async function() {
  while (visited.length !== 0) {
    const cell = visited[visited.length - 1];
    gameField.markAsVisited(cell);

    const neighbour = gameField.getUnvisitedNeighbour(cell);
    if (neighbour) {
      visited.push(neighbour);
      gameField.visitCell(cell, neighbour);
      await wait(ITERATION_TIME);
    } else {
      visited.pop();
    }
  }
})();
