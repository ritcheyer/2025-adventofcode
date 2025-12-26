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

type Edge = {
  type: 'Horizontal' | 'Vertical';
  yMin: number;
  yMax: number;
  xMin: number;
  xMax: number;
};

function buildEdges(tiles: number[][]): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < tiles.length; i++) {

    const currentTile = tiles[i];
    const nextTile: number[] = tiles[(i + 1) % tiles.length]; // this is the loop around from end to beginning bit

    const [x1, y1]: number[] = currentTile;
    const [x2, y2]: number[] = nextTile;

    if (y1 == y2) {
      edges.push({
        type: 'Horizontal' as const,
        yMin: Math.min(y1, y2),
        yMax: Math.max(y1, y2),
        xMin: Math.min(x1, x2),
        xMax: Math.max(x1, x2),
      });
     }
    else {
      edges.push({
        type: 'Vertical' as const,
        yMin: Math.min(y1, y2),
        yMax: Math.max(y1, y2),
        xMin: Math.min(x1, x2),
        xMax: Math.max(x1, x2),
      });
    }
  }
  return edges;
}

function isValidRectangle(
  tiles1: number[],
  tiles2: number[],
  edges: Edge[]
): boolean {
  const [x1, y1] = tiles1;
  const [x2, y2] = tiles2;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  let isValidEdge = true;

  for (const edge of edges) {
    // This is a horizontal ege at y = edge.yMin
    if (edge.type === 'Horizontal') {

      // This is a horizontal edge that is inside the rectangle
      if (edge.yMin > minY && edge.yMax < maxY) {
        // This is a horizontal edge that is inside the rectangle and overlaps horizontally with the rectangle
        if (edge.xMin < maxX && edge.xMax > minX) {
          isValidEdge = false;
          break;
        }
        // This is a horizontal edge that is inside the rectangle and does not overlap horizontally with the rectangle
      }
    } else if (edge.type === 'Vertical') {

      // This is a vertical edge at x = edge.xMin
      if (edge.xMin > minX && edge.xMax < maxX) {

        // This is a vertical edge that is inside the rectangle and overlaps vertically with the rectangle
        if (edge.yMin < maxY && edge.yMax > minY) {
          isValidEdge = false;
          break;
        }
      }

    }
  }
  return isValidEdge;
}

export function solveDay09Part2(input: string): number {
  const coordinates = parseLines(input);
  let maxPossibleArea = 0;

  // parse the coordinates into an array of [x, y] pairs
  const parsedCoordinates = coordinates.map((coord) =>
    coord.split(',').map(Number)
  );

  const edges = buildEdges(parsedCoordinates);

  for (let i = 0; i < parsedCoordinates.length; i++) {
    for (let j = i + 1; j < parsedCoordinates.length; j++) {

      const isValid = isValidRectangle(parsedCoordinates[i], parsedCoordinates[j], edges);

      if (isValid) {
        const area = calculateArea(
          parsedCoordinates[i][0],
          parsedCoordinates[i][1],
          parsedCoordinates[j][0],
          parsedCoordinates[j][1]);
        if (area > maxPossibleArea) {
          maxPossibleArea = area;
        }
      }
    }
  }

  return maxPossibleArea;
}

