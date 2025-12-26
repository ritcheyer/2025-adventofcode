# Day 9

## Part 1

### Part 1 -Notes

- Given 2 sets of coordinates (x1, y1), and (x2, y2), find the distance between them.
- Given those 2 sets of coordinates, find the other two corners
- With all 4 corners, find the length and width of the rectangle
- use the area formula to determine the area of the rectangle.
  - Area = Length × Width

Create a function that takes in 2 coordinates and returns the area of the rectangle.

- given: 2,5 and 9,7
  - TL 2,5 => Ax, Ay
  - BR 9,7 => Bx, By
  - TR Bx, Ay
  - BL Ax, By
- calculate the width and height
  - width  = difference(Bx-Ax)
  - height = difference(By-Ay)
- calculate the area
  - area = width x height

function difference(a, b) {
  return Math.abs(a - b);
}

function calculateArea(x1, y1, x2, y2) {
  const width = Math.abs(x1 - x2) + 1;
  const height = Math.abs(y1 - y2) + 1;
  return width * height;
}

calculateArea(2, 5, 9, 7)
// 14

loop over each pair of coordinates

Store the first area calculated in a variable called `largest_area`.

If the `current_area` is less than or equal to than the `largest_area`:
  do nothing

If the `current_area` is greater than the `largest_area`:
  update the `largest_area`

### Part 1 -Pseudo-code

```typescript
function difference(a, b) {
  return Math.abs(a - b);
}

function calculateArea(x1, y1, x2, y2) {
  const width = Math.abs(x1 - x2);
  const height = Math.abs(y1 - y2);
  return width * height;
}

// calculateArea(2, 5, 9, 7) returns 14

let maxPossibleArea = 0

loop over each pair of coordinates (coordA)
  const xA = coordA[x]
  const yA = coordA[y]
  loop over the next set of coordinates (coordB)
    const xB = coordB[x]
    const yB = coordB[y]

    const newArea = calculateArea(xA, yA, xB, yB)

    if newArea > maxPossibleArea {
      maxPossibleArea = newArea
    }


```

## Part 2

### Part 2 - Notes

#### Step 1: Parse the red tiles

- Same as Part 1 — you have a list of coordinates.

#### Step 2: Build the polygon edges

let edges = []

for i=0 to tiles.length-1
  current = tiles[i]
  next = tiles[(i + 1) % tiles.length] // this is the loop around from end to beginning bit

  if current.y === next.y
    // this is a horiz edge
    edges.push({
      type: 'H',
      y: current.y,
      xMin: min(current.x, next.x),
      xMax: max(current.x, next.x)
    })

  else
    // this is a vert edge
    edges.push({ type: 'V', x: current.x, yMin: min(current.y, next.y), yMax: max(current.y, next.y) })

#### Step 3: For each pair of red tiles

Find the rectangles based on the parsing in step 1 (e.g., j = i + 1)

#### Step 4: Check if the rectangle is valid

// given two corners `(x1, y1)` and `(x2, y2)`

minX = min(x1,x2)
maxX = max(x1,x2)
minY = min(y1,y2)
maxY = max(y1,y2)

let isValid=true

for each edge in edges
  if edge.type === 'H':                        // this is a horizontal edge at y = edge.y
    if edge.y > minY && edge.y < maxY:         // finds inside vertically
      if edge.xMin < maxX &&  edge.xMax > minX // overlaps horizontally
        isValid = false
        break

  if edge.type === 'V':                        // this is a vertical edge
    if edge.x > minX && edge.x < maxX          // strictly inside horizontally
      if edge.yMin < maxY && edge.yMax > minY: // overlaps vertically
        isValid = false
        break

#### Step 5: Track maximum area among valid rectangles

if isValid:
  area = (maxX - minX + 1) * (maxY - minY +1)
  maxArea = max(maxArea, area)

### Part 2 - Pseudo-code

```typescript

function buildEdges(tiles) {}

function isValidRectangle(tiles1, tiles2, edges) {}

function solveDay09Part2(input):
    const tiles = parse(input)
    const edges = buildEdges(tiles)
    let maxArea = 0

    for i = 0 to tiles.length:
        for j = i + 1 to tiles.length:
            if isValidRectangle(tiles[i], tiles[j], edges):
                area = calculateArea(tiles[i], tiles[j])
                maxArea = max(maxArea, area)

    return maxArea
```
