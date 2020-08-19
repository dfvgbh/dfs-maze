import { Cell, VisitDirection } from './models';

export const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export function getVisitDirection(to: Cell, from: Cell): VisitDirection | undefined {
  const [toI, toJ] = to;
  const [fromI, fromJ] = from;

  if (fromJ - toJ === 1 && fromI === toI) return VisitDirection.Left;
  if (fromI - toI === 1 && fromJ === toJ) return VisitDirection.Top;
  if (fromJ - toJ === -1 && fromI === toI) return VisitDirection.Right;
  if (fromI - toI === -1 && fromJ === toJ) return VisitDirection.Bottom;

  return undefined;
}
