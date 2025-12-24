export * from './day01';
export * from './day02';
export * from './day03';
export * from './day04';
export * from './day05';
export * from './day06';
export * from './day07';
export * from './day08';

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
import { solveDay03Part1, solveDay03Part2 } from './day03';
import { solveDay04Part1, solveDay04Part2 } from './day04';
import { solveDay05Part1, solveDay05Part2 } from './day05';
import { solveDay06Part1, solveDay06Part2 } from './day06';
import { solveDay07Part1, solveDay07Part2 } from './day07';
import { solveDay08Part1, solveDay08Part2 } from './day08';

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
  {
    day: 3,
    part1: solveDay03Part1,
    part2: solveDay03Part2,
    // Fill these in from the puzzle description
    example: { part1: 357, part2: 3121910778619 },
  },
  {
    day: 4,
    part1: solveDay04Part1,
    part2: solveDay04Part2,
    // Fill these in from the puzzle description
    example: { part1: 13, part2: 43 },
  },
  {
    day: 5,
    part1: solveDay05Part1,
    part2: solveDay05Part2,
    // Fill these in from the puzzle description
    example: { part1: 3, part2: 14 },
  },
  {
    day: 6,
    part1: solveDay06Part1,
    part2: solveDay06Part2,
    // Fill these in from the puzzle description
    example: { part1: 4277556, part2: 3263827 },
  },
  {
    day: 7,
    part1: solveDay07Part1,
    part2: solveDay07Part2,
    // Fill these in from the puzzle description
    example: { part1: 21, part2: 40 },
  },
  {
    day: 8,
    part1: solveDay08Part1,
    part2: solveDay08Part2,
    // Fill these in from the puzzle description
    example: { part1: 40, part2: undefined },
  },
];


