import { Cell, CellState, FieldState, VisitDirection } from './models';
import { getVisitDirection } from './utils';

export class GameField {
  private readonly fieldState: FieldState;

  constructor(
    private readonly fieldContainer: HTMLElement,
    private readonly rowsCount: number,
    private readonly colsCount: number,
  ) {
    this.fieldContainer.innerHTML = this.makeFieldTemplate();
    this.fieldState = this.makeFieldState();
  }

  markAsVisited(cell: Cell) {
    const [i, j] = cell;
    this.fieldState[i][j] = CellState.Visited;

    const cellEl = this.fieldContainer.querySelector(`[data-role="cell-${i}-${j}"]`);
    cellEl && cellEl.classList.add('dfs-cell--visited');
  }

  visitCell(cellFrom: Cell, cellTo: Cell) {
    const visitDirection = getVisitDirection(cellTo, cellFrom);
    if (visitDirection === undefined) return;

    const cellFromEl = this.fieldContainer.querySelector(`[data-role="cell-${cellFrom[0]}-${cellFrom[1]}"]`);
    const cellToEl = this.fieldContainer.querySelector(`[data-role="cell-${cellTo[0]}-${cellTo[1]}"]`);

    if (visitDirection === VisitDirection.Left) {
      cellFromEl && cellFromEl.classList.add('dfs-cell--visited-left');
      cellToEl && cellToEl.classList.add('dfs-cell--visited-right');
      return;
    }

    if (visitDirection === VisitDirection.Top) {
      cellFromEl && cellFromEl.classList.add('dfs-cell--visited-top');
      cellToEl && cellToEl.classList.add('dfs-cell--visited-bottom');
      return;
    }

    if (visitDirection === VisitDirection.Right) {
      cellFromEl && cellFromEl.classList.add('dfs-cell--visited-right');
      cellToEl && cellToEl.classList.add('dfs-cell--visited-left');
      return;
    }

    if (visitDirection === VisitDirection.Bottom) {
      cellFromEl && cellFromEl.classList.add('dfs-cell--visited-bottom');
      cellToEl && cellToEl.classList.add('dfs-cell--visited-top');
      return;
    }
  }

  getRandomCell(): Cell {
    const randomInt = (max: number) => Math.floor(Math.random() * max);

    return [randomInt(this.rowsCount), randomInt(this.colsCount)];
  }

  getUnvisitedNeighbour(cell: Cell): Cell | undefined {
    const [i, j] = cell;
    const leftCell = j - 1 >= 0 ? [i, j - 1] as Cell : undefined;
    const topCell = i - 1 >= 0 ? [i - 1, j] as Cell : undefined;
    const rightCell = j + 1 < this.colsCount ? [i, j + 1] as Cell : undefined;
    const bottomCell = i + 1 < this.rowsCount ? [i + 1, j] as Cell : undefined;
    const cellsAround = [leftCell, topCell, rightCell, bottomCell];
    const startFrom = Math.floor(Math.random() * cellsAround.length);

    for (let index = 0; index < cellsAround.length; index++) {
      const cell = cellsAround[(startFrom + index) % cellsAround.length];
      if (cell && !this.isVisited(cell)) return cell;
    }

    return undefined;
  }

  private isVisited(cell: Cell) {
    const [i, j] = cell;
    return this.fieldState[i][j] === CellState.Visited;
  }

  private makeFieldTemplate(): string {
    let fieldTemplate = '';

    for (let row = 0; row < this.rowsCount; row++) {
      fieldTemplate += '<div class="dfs-row">';
      for (let col = 0; col < this.colsCount; col++) {
        fieldTemplate += `<div class="dfs-cell" data-role="cell-${row}-${col}"></div>`;
      }
      fieldTemplate += '</div>';
    }

    return fieldTemplate;
  }

  private makeFieldState(): FieldState {
    return Array.from(Array(this.rowsCount))
      .map(() => Array(this.colsCount).fill(CellState.Unvisited));
  }
}
