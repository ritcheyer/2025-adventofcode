# Day 6

## Part 1

### Notes

#### General

- Columns are either mathed together based on the last row of the data.
- The total of each column is then added together to find the final solution

#### Edge Cases

- Spaces matter! Spaces between numbers must be maintained as some columns are empty
- The rows might be of unequal length. Need to normalize first
- Determining column width:
  - A column entirely made of spaces separates digits.
  - The first non-space character within each problem's columns (on the last row) is the math symbol.
  - Once the columns have been identified, push them into an array

### Math things

- If the math symbol is a plus sign (+), add the numbers together
- If the math symbol is a multiplication sign (*), multiply the numbers together
- Add each column's integers and math symbol to a new array to add (or multiply)

### Pseudo-code

```plaintext

separatorColumns = []
startOfRange = null
problemRanges = []

// find the row that is the longest (maxlength)
find rowMaxLength

// pad every row with spaces to make all rows equal lengths
for each row
  padRow to rowMaxLength (string.padEnd(length, ''))
  push to new array

// find the columns that separate each number to be added or multiplied together
for columnIndex from 0 to rowMaxLength
  isAllSpaces = true
  for each row:
    if row[columnIndex] is NOT a space
      isAllSpaces = false
      break
  if isAllSpaces
    add columnIndex to separatorColumns

// Find columns that should be added or multiplied together using the saved columnIndex
for columnIndex from 0 to maxRowLength
  if columnIndex is in separatorColumns:
    // we hit a separator
    if startOfRange is not null:
      // we are tracking a range, close it
      add [startOfRange, columnIndex -1] to problemRanges
        startOfRange = null
  else
    // not a separator
    if startOfRange is null:
      // start a new range
      startOfRange = columnIndex


// if we ended without hitting a separator, close the last range
if startOfRange is not null:
  add [startOfRange, rowMaxLength - 1] to problemRanges
  // this will give me something like [[0,2],[4,6],...]
  // where the first element is the start of the range
  // and the second element is the end of the range
  // range in this context means the column indices
  // that match the start and end of a number to be added together

// math time
total = 0

for each [start, end] in problemRanges:
  numbers = []

  // get numbers from each data row (all rows except the last)
  for each row (not the operation row):
    substring = row.substring(start, end + 1)
    trimmed = substring.trim()
    if trimmed is not empty
      add parseInt(trimmed) to numbers

  // get operations from last row
  operation = find '+' or '*' in lastRow.slice(start,end+1)

  // do the math
  if operation is '+'
    result = sum of numbers
  else
    result = product of numbers

  total += result

return total


```

## Part 2

### Notes



### Pseudo-code

```plaintext

```

