# Day 7: Laboratories

## Problem Summary

- Tachyon beam enters at `S` and moves **downward**
- Empty space (`.`) - beams pass through freely
- Splitter (`^`) - beam stops, two NEW beams continue from immediate left and right
- Count: total number of times a beam is split

## Key Observations

1. Beams only move in one direction: **down**
2. When hitting `^`, the original beam is replaced by 2 beams (one left, one right)
3. Multiple beams can converge to the same column (they merge conceptually)
4. Need to count: how many splitter hits occur total

## Example Analysis

```plaintext
.......S.......    <- Start at column 7
.......|.......
.......^.......    <- Split #1: beams now at cols 6 and 8
......|.|......
......^.^......    <- Split #2 and #3: now cols 5, 7, 9 (middle merged)
```

The example has 21 total splits.

## Approach Ideas

- ?

## Data Structures

- Grid parsing (find S position, find all ^ positions)
- Track active beam positions as they descend row by row?
- Or think about it differently...

## Part 1

- Start at `S` and move downward
- When hitting `^`, split into 2 beams: one left (-1), one right (+1)
- Count the number of times a beam is split
- In Row 1, find the position of the `S` and store it as the starting point
- Place a beam (`|`) directly below the `S` in Row 2
- For each row thereafter (Row 3 until row.length):
  - If the current position is a `.` and there is a beam directly above:
    - replace `.` with `|`
  - If the current position is a `^` and there is a beam directly above:
    - Replace the position directly left (-1) and right (+1) with beams (`|`)

- Count the number of `^` character have a beam directly above them (Row-1)

### Pseudo Code

```typescript
// this is the starting location of the tachyon beam
const grid = input.split('\n');
const startingLocation = grid[0].indexOf('S', 0);


let tachyonSet: Set<number> = new Set([startingLocation]);

// Count the total number of tachyon splits
let tachyonSplit = 0;

// traverse rows, adding beams where necessary
for (let row = 1; row < grid.length; row++) {
  const nextBeams = new Set<number>();

  for (const col of tachyonSet) {
    const cell = grid[row][col];
    if (cell === '.') {
      nextBeams.add(col);
    } else if (cell === '^') {
      nextBeams.add(col-1);
      nextBeams.add(col+1);
      tachyonSplit++;
    }
  }
  tachyonSet = nextBeams;
}

console.log(tachyonSplit);
```

## Part 2

(Not yet revealed)

