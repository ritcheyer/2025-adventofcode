# Day 8

## Part 1

### Notes

Step 1. Read the input file
Step 2. Find the distance between every junction box based on 3d euclidean distance math things. example:
  - `d=sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}+(z_{2}-z_{1})^{2}}`
    Box 0 -> Box 1, Box 0 -> Box 2, Box 0 -> Box 3...Box 0 -> Box 19
    Box 1 -> Box 2, ... Box 2 -> Box 19
    Box 2 -> Box 3, ... Box 3 -> Box 19
    ...
    Box 18 -> Box 19

Step 3:
Store the distance between every junction box in an array that is shaped like this:
`[{ boxA, boxB, distance },...]` and as a real example that'd look like this
```
[
  {
    boxA: 1,
    boxB: 2,
    distance: distance-between-the-two-points
  },
  ...
  {
    boxA: 1,
    boxB: 19,
    distance: distance-between-the-two-points
  },
  ...,
]
```

Step 4:
Sort that array by the calculated distance with shortest first.

Step 5:
Once sorted, ignore every input after 10 for the example, and 1000 for the real input.

Step 6:
Create a parentArray that is the same length as the number of boxes (20 for example, 1000 for real (inputLines.length)). This array contains: `[index, parentId]` where `parentId` is initialized to the same number as `index`.

Step 7:
1. Create a function to find the root of a box
2. Create a function to union two boxes

```
parentArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

function find(boxId: number): number {
  if (parentArray[boxId] === boxId) {
    return boxId;
  }
  return find(parentArray[boxId]);
}

function union(boxA: number, boxB: number) {
  // exit quickly
  if (boxA === boxB) {
    return;
  }
  // set values
  const rootA = find(boxA);
  const rootB = find(boxB);

  // if not equal, set itk.
  if (rootA !== rootB) {
    parentArray[rootA] = rootB;
  }
}
```


Step 8:
Loop over sorted array, looking for unions

```
const limit = boxes.length === 20 ? 10 : 1000;
for (let i = 0; i < limit; i++) {
  const { boxA, boxB, distance } = sortedArray[i];
  union(boxA, boxB);
}
```

Step 9:
for each box (0-19)
  find the root of the box
  group boxes by their root
  return the number of groups

count the size of each group
multiply the 3 largest sizes together

return the result.

### Pseudo-code

```typescript

// Use the 3D Euclidean Distance Formula to calculate the distance between two points in 3D space

// Step 1: read in the file
const boxes = parseLines(input);

// Step 2: determine distance in 3D
function distance3D(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

// Step 3: Create array of boxes
function createBoxes(input: string): Box[] {
  const coordinates = input.split('\n');
  const boxes: Box[] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y, z] = coordinates[i].split(',').map(Number);
    boxes.push({ x, y, z });
  }
  return boxes;
}

// Step 4: Calculate distance between boxes
function calculateDistance(boxA: Box, boxB: Box): number {
  return distance3D(boxA.x, boxA.y, boxA.z, boxB.x, boxB.y, boxB.z);
}

// Step 5: Sort the boxes by distance
function sortBoxesByDistance(boxes: Box[]): Box[] {
  return boxes.sort((a, b) => calculateDistance(a, b));
}

// Step 6: Create array of distances
function createJunctions(boxes: Box[]): Distance[] {
  const distances: Distance[] = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const distance = calculateDistance(boxes[i], boxes[j]);
      distances.push({ boxA: i, boxB: j, distance });
    }
  }
  return distances;
}

// Step 7: Sort the distances by distance
function sortJunctionsByDistance(distances: Distance[]): Distance[] {
  return distances.sort((a, b) => a.distance - b.distance);
}
```

## Part 2

### Notes



### Pseudo-code

```plaintext

```
