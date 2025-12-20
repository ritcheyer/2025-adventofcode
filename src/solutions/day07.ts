export function solveDay07Part1(input: string): number {
  // this is the starting location of the tachyon beam
  const grid = input.split('\n');
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
  // TODO: Implement part 2
  return 0;
}

