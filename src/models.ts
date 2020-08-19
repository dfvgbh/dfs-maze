export type Cell = [number, number];

export enum CellState {
  Unvisited,
  Visited,
}

export type FieldState = CellState[][];

export enum VisitDirection {
  Left,
  Top,
  Right,
  Bottom,
}
