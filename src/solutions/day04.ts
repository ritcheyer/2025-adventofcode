import { parseLines } from '../utils/parse';

const ROLL_CHAR = '@';
const EMPTY_CHAR = '.';
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  /*[0, 0]*/ [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];


export function solveDay04Part1(input: string): number {
  const grid = parseLines(input);
  // console.log(grid);

  let rollCount = 0;

  const getNeighbors = (grid: string[], rowIndex: number, colIndex: number) => {
    const neighbors: string[] = [];
    directions.forEach(([dx, dy]) => {
      const [newRow, newCol] = [rowIndex + dx, colIndex + dy];

      // return symbol at new grid position
      neighbors.push(grid[newRow]?.[newCol] ?? '');
    });
    return neighbors;
  };

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
        if (count < 4) {
          rollCount++;
        }
      }
    });
  });

  return rollCount;
}

export function solveDay04Part2(input: string): number {
  const grid = parseLines(input);

  // convert grid to a mutable grid so it can be modified
  const mutableGrid = grid.map((row) => [...row].map((char) => char));

  console.log('mutableGrid', mutableGrid);

  let rollCount = 0;

  let canRemoveRolls = true;


  const getNeighbors = (grid: string[][], rowIndex: number, colIndex: number) => {
    const neighbors: string[] = [];
    directions.forEach(([dx, dy]) => {
      const [newRow, newCol] = [rowIndex + dx, colIndex + dy];

      // return symbol at new grid position
      neighbors.push(grid[newRow]?.[newCol] ?? '');
    });
    return neighbors;
  };

  while (canRemoveRolls) {
    console.log(mutableGrid);
    const removableRolls: number[][] = [];

    mutableGrid.forEach((row, rowIndex) => {
      row.forEach((thisCharacter, colIndex) => {
        if (thisCharacter === ROLL_CHAR) {
          const neighborArray = getNeighbors(mutableGrid, rowIndex, colIndex);
          const count = neighborArray.filter(
            (neighborCharacter) => neighborCharacter === ROLL_CHAR
          ).length;
          if (count < 4) {
            rollCount++;
            removableRolls.push([rowIndex, colIndex] as [number, number]);
          }

        }
      });
    });

    // remove the rolls from the grid
    removableRolls.forEach(([rowIndex, colIndex]) => {
      mutableGrid[rowIndex][colIndex] = EMPTY_CHAR;
    });

    if (removableRolls.length === 0) {
      canRemoveRolls = false;
    }

    console.log('rollCount', rollCount);
  }

  // console.log('mutableGrid', mutableGrid);
  // console.log('rollCount', rollCount);
  return rollCount;
}

