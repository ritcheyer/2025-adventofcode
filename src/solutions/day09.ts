import { parseLines } from "@/utils/parse";

/**
 *
 * @param a - The first number
 * @param b - The second number
 * @returns The difference between the two numbers
 */
function difference(a: number, b: number): number {
  return Math.abs(a - b);
}

/**
 * Calculate the area of a rectangle given two points
 * @param x1 - The x coordinate of the first point
 * @param y1 - The y coordinate of the first point
 * @param x2 - The x coordinate of the second point
 * @param y2 - The y coordinate of the second point
 * @returns The area of the rectangle
 */
function calculateArea(x1: number, y1: number, x2: number, y2: number): number {
  const width = difference(x1, x2) + 1;
  const height = difference(y1, y2) + 1;
  return width * height;
}

export function solveDay09Part1(input: string): number {
  const coordinates = parseLines(input);
  let maxPossibleArea = 0;

  // parse the coordinates into an array of [x, y] pairs
  const parsedCoordinates = coordinates.map(coord => coord.split(',').map(Number));

  // loop through each pair of coordinates and calculate the area
  for (let i = 0; i < parsedCoordinates.length; i++) {
    for (let j = i + 1; j < parsedCoordinates.length; j++) {
      const [x1, y1] = parsedCoordinates[i];
      const [x2, y2] = parsedCoordinates[j];
      const area = calculateArea(x1, y1, x2, y2);
      if (area > maxPossibleArea) {
        maxPossibleArea = area;
      }
    }
  }

  return maxPossibleArea;
  // returns 50 for example input
  // returns 4759930955 for real input
}

export function solveDay09Part2(input: string): number {
  const coordinates = parseLines(input);
  // TODO: Implement part 2
  return 0;
}

