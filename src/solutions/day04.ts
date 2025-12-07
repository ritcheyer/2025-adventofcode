import { parseLines } from '../utils/parse';


export function solveDay04Part1(input: string): number {
  const grid = parseLines(input);
  // console.log(lines);

  const ROLL_CHAR = '@';
  let rollCount = 0;
  const directions = [
    [-1, -1], [-1, 0],   [-1, 1],
    [0, -1], /*[0, 0]*/  [0, 1],
    [1, -1],  [1, 0],    [1, 1],
  ];

  const getNeighbors = (grid: string[], rowIndex: number, colIndex: number) => {
    const neighbors: string[] = [];
    directions.forEach(([dx, dy]) => {
      const [newRow, newCol] = [rowIndex + dx, colIndex + dy];

      // return symbol at new grid position
      neighbors.push(grid[newRow]?.[newCol] ?? '');
    });
    return neighbors;
  }

  // Iterate over each row and column in the grid
  // If the character is a roll, get the neighbors and count the number of rolls
  // If the count is less than 4, increment the roll count
  // Return the roll count
  grid.forEach((rowArray, rowIndex) => {

    [...rowArray].forEach((thisCharacter, colIndex) => {
      if (thisCharacter === ROLL_CHAR) {
        const neighborArray = getNeighbors(grid, rowIndex, colIndex);
        const count = neighborArray.filter(
          (neighborCharacter) => neighborCharacter === ROLL_CHAR
        ).length;
        if(count < 4) {
          rollCount++;
        }
      }
    });
  })

  // TODO: Implement solution
  return rollCount;
}

export function solveDay04Part2(input: string): number {
  const lines = parseLines(input);

  // TODO: Implement solution
  return 0;
}

