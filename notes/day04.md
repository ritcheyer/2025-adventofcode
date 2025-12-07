# Day 4

## Part 1

### Notes

- The input is a grid of symbols
- I need to identify which rolls of paper can be accessed.
- Access is defined by:
  - fewer than 4 neighboring rolls (0, 1, 2, 3 neighbors)
- Find rolls in all 8 directions
- Count them

This can be achieved by following a coordinate system using rows and columns.
Find the length of the row

I did this in last year's AoC by thinking about this like coordinates on a compass:

| Direction | X Coord | Y Coord |
|---|---|---|
| North     |  0 | -1  |
| South     |  0 |  1  |
| East      |  1 |  0  |
| West      | -1 |  0  |
| Northwest | -1 | -1  |
| Northeast |  1 | -1  |
| Southwest | -1 |  1  |
| Southeast |  1 |  1  |

**Rules of the game:**

- If a given index (row1col1) contains the the symbol, start looking for other symbols in the grid
- If a given direction is blank; we don't need to deal with any edges.
- Collect the 8 symbols into a string
- Save that string to an array
- move onto the next index (row1col2)
- repeat for every index on the grid (rowXcolY)

### Pseudo-code

```js

const ROLL_CHAR = '@';

getNeighbors = (grid, rowIndex, colIndex) => {
  const neighbors = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  directions.forEach((direction) => {
    const [dx, dy] = direction;
    const [newRow, newCol] = [rowIndex + dx, colIndex + dy];
    if(newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[rowIndex].length) {
      neighbors.push(grid[newRow][newCol]);
    }
  });

  return neighbors;

}

grid.forEach((rowArray, rowIndex) => {
  rowArray.forEach((char, colIndex) => {
    console.log(`Char at [${rowIndex}][${colIndex}]:`, char);

    if(char === ROLL_CHAR) {
      const neighbors = getNeighbors(grid, rowIndex, colIndex);
    }
  });
});
```

## Part 2

### Notes

-
