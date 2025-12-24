import { parseLines } from "@/utils/parse";

function straightLineDistance(pointA: number[], pointB: number[]): number {
  return Math.sqrt(Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2) + Math.pow(pointB[2] - pointA[2], 2));
}
function union(parentArray: number[], boxA: number, boxB: number) {
  const rootA = find(parentArray, boxA);
  const rootB = find(parentArray, boxB);
  if (rootA !== rootB) {
    parentArray[rootA] = rootB;
  }
}
function find(parentArray: number[], boxId: number): number {
  if (parentArray[boxId] === boxId) {
    return boxId;
  } else {
    return find(parentArray, parentArray[boxId]);
  }
}

export function solveDay08Part1(input: string): number {
  const coordinates = parseLines(input);
  // console.log('coordinates', coordinates);

  const boxCoordinates: number[][] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y, z] = coordinates[i].split(',').map(Number);
    boxCoordinates.push([x, y, z]);
  }
  // console.log('boxCoordinates', boxCoordinates);

  const distances: { boxA: number, boxB: number, distance: number }[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    for (let j = i + 1; j < boxCoordinates.length; j++) {
      const distance = straightLineDistance(boxCoordinates[i], boxCoordinates[j]);
      distances.push({ boxA: i, boxB: j, distance });
    }
  }
  // console.log('distances', distances);

  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
  // console.log('sortedDistances', sortedDistances);

  const parentArray: number[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    parentArray.push(i);
  }
  // console.log('parentArray', parentArray);

  const limit = boxCoordinates.length === 20 ? 10 : 1000;
  for (let i = 0; i < limit; i++) {
    const { boxA, boxB, distance } = sortedDistances[i];
    union(parentArray, boxA, boxB);
  }
  // console.log('parentArray', parentArray);

  const counts = new Map<number, number>();
  for (let i = 0; i < parentArray.length; i++) {
    const root = find(parentArray, i);
    counts.set(root, (counts.get(root) ?? 0) + 1);
  }
  // console.log('counts', counts);

  const sortedCounts = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  // console.log('sortedCounts', sortedCounts);

  const largestCounts = sortedCounts.slice(0, 3);
  // console.log('largestCounts', largestCounts);

  const result = largestCounts.reduce((a, b) => a * b[1], 1);
  // console.log('result', result);

  return result;
}

export function solveDay08Part2(input: string): number {
  // TODO: Implement part 2
  return 0;
}
