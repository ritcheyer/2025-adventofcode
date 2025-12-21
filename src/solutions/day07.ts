import { parseLines } from '../utils/parse';

export function solveDay07Part1(input: string): number {
  // this is the starting location of the tachyon beam
  const grid = parseLines(input);
  const startingLocation = grid[0].indexOf('S', 0);

  let tachyonSet: Set<number> = new Set([startingLocation]);

  // Count the total number of tachyon splits
  let tachyonSplit = 0;

  // traverse rows, adding beams where necessary
  for (let row = 1; row < grid.length; row++) {
    const nextBeams = new Set<number>();

    for (const col of tachyonSet) {
      const cell = grid[row][col];
      if (cell === '.') {
        nextBeams.add(col);
      } else if (cell === '^') {
        nextBeams.add(col - 1);
        nextBeams.add(col + 1);
        tachyonSplit++;
      }
    }
    tachyonSet = nextBeams;
  }

  return tachyonSplit;
}

export function solveDay07Part2(input: string): number {
  const grid = parseLines(input);
  const startingLocation = grid[0].indexOf('S', 0);

  let timelines: Map<number, number> = new Map<number, number>();

  timelines.set(startingLocation, 1);

  for (let row = 1; row < grid.length; row++) {
    const nextTimelines = new Map<number, number>();

    for (const col of timelines.keys()) {
      const cell = grid[row][col];
      const incoming = timelines.get(col) ?? 0;
      if (cell === '.') {
        const existing = nextTimelines.get(col) ?? 0;
        nextTimelines.set(col, existing + incoming);
      } else if (cell === '^') {
        const existingLeft = nextTimelines.get(col - 1) ?? 0;
        const existingRight = nextTimelines.get(col + 1) ?? 0;
        nextTimelines.set(col - 1, existingLeft + incoming);
        nextTimelines.set(col + 1, existingRight + incoming);
      }
    }
    timelines = nextTimelines;
  }
  return [...timelines.values()].reduce((a, b) => a + b, 0);
}
