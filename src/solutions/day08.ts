import { parseLines } from "@/utils/parse";

/**
 * Calculate the straight line distance between two points in 3D space.
 * See more here https://en.wikipedia.org/wiki/Euclidean_distance
 *
 * @param pointA - The first point [x, y, z]
 * @param pointB - The second point [x, y, z]
 * @returns The distance between the two points
 */
function straightLineDistance(pointA: number[], pointB: number[]): number {
  return Math.sqrt(Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2) + Math.pow(pointB[2] - pointA[2], 2));
}

/**
 * Union two boxes into the same group.
 * See more at the following links:
 * - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
 * - https://share.google/aimode/USb9fruRqk75s1bv3
 * - https://youtu.be/92UpvDXc8fs?si=AirRvRUp_sVvzHSr
 *
 * @param parentArray - The parent array
 * @param boxA - The first box
 * @param boxB - The second box
 */
function union(parentArray: number[], boxA: number, boxB: number): boolean {
  const rootA = find(parentArray, boxA);
  const rootB = find(parentArray, boxB);
  if (rootA !== rootB) {
    parentArray[rootA] = rootB;
    // console.log('union successful', rootA, rootB);
    return true; // union successful
  }
  // console.log('union failed', rootA, rootB);
  return false; // union failed
}

/**
 * Find the root of a box.
 * See more at the following links:
 * - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
 * - https://share.google/aimode/USb9fruRqk75s1bv3
 * - https://youtu.be/92UpvDXc8fs?si=AirRvRUp_sVvzHSr
 *
 * @param parentArray - The parent array
 * @param boxId - The box ID
 * @returns The root of the box
 */
function find(parentArray: number[], boxId: number): number {
  if (parentArray[boxId] === boxId) {
    return boxId;
  } else {
    return find(parentArray, parentArray[boxId]);
  }
}
/**
 * Solve Day 8 Part 1: Connect junction boxes using Union-Find.
 *
 * Algorithm:
 * 1. Calculate distances between all pairs of boxes
 * 2. Sort pairs by distance (closest first)
 * 3. Use Union-Find to connect the closest N pairs into circuits
 * 4. Return the product of the 3 largest circuit sizes
 *
 * @param input - The puzzle input (one "x,y,z" coordinate per line)
 * @returns The product of the 3 largest circuit sizes
 */
export function solveDay08Part1(input: string): number {
  const coordinates = parseLines(input);
  // console.log('coordinates', coordinates);

  // Create an array of box coordinates.
  // Each box is represented as a point in 3D space [x, y, z].
  const boxCoordinates: number[][] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y, z] = coordinates[i].split(',').map(Number);
    boxCoordinates.push([x, y, z]);
  }
  // console.log('boxCoordinates', boxCoordinates);

  // Create an array of distances between every pair of boxes.
  // With N boxes, this produces N*(N-1)/2 pairs.
  const distances: { boxA: number, boxB: number, distance: number }[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    for (let j = i + 1; j < boxCoordinates.length; j++) {
      const distance = straightLineDistance(boxCoordinates[i], boxCoordinates[j]);
      distances.push({ boxA: i, boxB: j, distance });
    }
  }
  // console.log('distances', distances);

  // Sort the distances (shortest first).
  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
  // console.log('sortedDistances', sortedDistances);

  // Initialize parent array for Union-Find.
  // Each box starts as its own root (parentArray[i] = i).
  const parentArray: number[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    parentArray.push(i);
  }
  // console.log('parentArray', parentArray);

  // Process the closest pairs and union them into circuits.
  // Example uses 10 connections, real input uses 1000.
  const limit = boxCoordinates.length === 20 ? 10 : 1000;
  for (let i = 0; i < limit; i++) {
    const { boxA, boxB } = sortedDistances[i];
    union(parentArray, boxA, boxB);
  }
  // console.log('parentArray', parentArray);

  // Count the number of boxes in each circuit (group by root).
  const counts = new Map<number, number>();
  for (let i = 0; i < parentArray.length; i++) {
    const root = find(parentArray, i);
    counts.set(root, (counts.get(root) ?? 0) + 1);
  }
  // console.log('counts', counts);

  // Sort circuits by size (largest first).
  const sortedCounts = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  // console.log('sortedCounts', sortedCounts);

  // Get the 3 largest circuits.
  const largestCounts = sortedCounts.slice(0, 3);
  // console.log('largestCounts', largestCounts);

  // Multiply the 3 largest circuit sizes together.
  const result = largestCounts.reduce((a, b) => a * b[1], 1);
  // console.log('result', result);

  return result;
}

export function solveDay08Part2(input: string): number {
  const coordinates = parseLines(input);
  console.log('coordinates', coordinates);

  // Create an array of box coordinates.
  // Each box is represented as a point in 3D space [x, y, z].
  const boxCoordinates: number[][] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y, z] = coordinates[i].split(',').map(Number);
    boxCoordinates.push([x, y, z]);
  }
  console.log('boxCoordinates', boxCoordinates);

  // Create an array of distances between every pair of boxes.
  // With N boxes, this produces N*(N-1)/2 pairs.
  const distances: { boxA: number, boxB: number, distance: number }[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    for (let j = i + 1; j < boxCoordinates.length; j++) {
      const distance = straightLineDistance(boxCoordinates[i], boxCoordinates[j]);
      distances.push({ boxA: i, boxB: j, distance });
    }
  }
  console.log('distances', distances);

  // Sort the distances (shortest first).
  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
  console.log('sortedDistances', sortedDistances);

  // Initialize parent array for Union-Find.
  // Each box starts as its own root (parentArray[i] = i).
  const parentArray: number[] = [];
  for (let i = 0; i < boxCoordinates.length; i++) {
    parentArray.push(i);
  }
  console.log('parentArray', parentArray);


  // TODO: Loop until all boxes are in one circuit
  let circuitCount = boxCoordinates.length;

  const limit = sortedDistances.length;
  let lastMergePair = {boxA: -1, boxB: -1};
  for (let i = 0; i < limit; i++) {
    const { boxA, boxB } = sortedDistances[i];

    if (union(parentArray, boxA, boxB)) {
      circuitCount--;
      lastMergePair = { boxA, boxB }; // Save this pair for multiplication
      // console.log('lastMergePair:', lastMergePair);

      if (circuitCount === 1) {
        break; // We just completed the final merge, so we can exit the loop.
      }
    }
    console.log('circuitCount:', circuitCount);
  }

  // TODO: Track the last pair that merged two circuits
  console.log('lastMergePair:', lastMergePair);
  // TODO: Return the product of their X coordinates
  const xA = boxCoordinates[lastMergePair.boxA][0];
  const xB = boxCoordinates[lastMergePair.boxB][0];
  const product = xA * xB;


  return product;
}
