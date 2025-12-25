import { parseLines } from "@/utils/parse";


function difference(a: number, b: number) {
  return Math.abs(a - b);
}

function calculateArea(x1: number, y1: number, x2: number, y2: number) {
  const width = difference(x1, x2) + 1;
  const height = difference(y1, y2) + 1;
  return width * height;
}

export function solveDay09Part1(input: string): number {
  const coordinates = parseLines(input);
  let maxPossibleArea = 0;

  for (const coordA of coordinates) {
    const [xA, yA] = coordA.split(',').map(Number);
    for (const coordB of coordinates) {
      const [xB, yB] = coordB.split(',').map(Number);
      const area = calculateArea(xA, yA, xB, yB);
      if (area > maxPossibleArea) {
        maxPossibleArea = area;
      }
    }
  }

  return maxPossibleArea;
}

export function solveDay09Part2(input: string): number {
  const coordinates = parseLines(input);
  // TODO: Implement part 2
  return 0;
}

