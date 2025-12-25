# Day 9

## Part 1

### Notes

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

### Pseudo-code

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

### Notes

### Pseudo-code

```plaintext

```
