export * from './day01';
export * from './day02';

export interface Solution {
  day: number;
  part1: (input: string) => number | string;
  part2: (input: string) => number | string;
  // Expected answers for example input (for verification)
  example?: {
    part1?: number | string;
    part2?: number | string;
  };
}

import { solveDay01Part1, solveDay01Part2 } from './day01';
import { solveDay02Part1, solveDay02Part2 } from './day02';

export const solutions: Solution[] = [
  {
    day: 1,
    part1: solveDay01Part1,
    part2: solveDay01Part2,
    // Fill these in from the puzzle description
    example: { part1: 3, part2: 6 },
  },
  {
    day: 2,
    part1: solveDay02Part1,
    part2: solveDay02Part2,
    // Fill these in from the puzzle description
    example: { part1: 1227775554, part2: 4174379265 },
  },
];


