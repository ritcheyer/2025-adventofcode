import { parseLines } from '../utils/parse';

export function solveDay06Part1(input: string): number {
  const lines = parseLines(input);

  /**
   * Setup phase - pad the rows to the same length
   */

  // which line is the longest?
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);

  // pad the lines to be the same length based on the longest one
  const paddedLines = lines.map(line => line.padEnd(maxLength, ' '));

  // console.log(paddedLines);

  /**
   * Separator phase - Find the columns that separate each number to be added or multiplied together
   */
  const separatorColumns: number[] = [];

  for (let columnIndex = 0; columnIndex < maxLength; columnIndex++) {
    let isAllSpaces = true;
    for (let rowIndex = 0; rowIndex < paddedLines.length; rowIndex++) {

      // console.log(paddedLines[rowIndex][columnIndex])
      if (paddedLines[rowIndex][columnIndex] !== ' ') {
        isAllSpaces = false;
        break;
      }
    }
    if (isAllSpaces) {
      separatorColumns.push(columnIndex);
    }

    // console.log(separatorColumns);
  }

  /**
   * Range phase - Find the ranges of numbers to be added or multiplied together
   */

  const problemRanges: number[][] = [];
  let startOfRange: number | null = null;
  for (let columnIndex = 0; columnIndex < maxLength; columnIndex++) {
    if (separatorColumns.includes(columnIndex)) {
      if (startOfRange !== null) {
        problemRanges.push([startOfRange, columnIndex - 1]);
        startOfRange = null;
      }
    } else {
      if (startOfRange === null) {
        startOfRange = columnIndex;
      }
    }
  }
  if (startOfRange !== null) {
    problemRanges.push([startOfRange, maxLength - 1]);
  }
  // console.log(problemRanges);

  /**
   * Math phase - Do the math
   */
  let total = 0;
  for (let range of problemRanges) {
    const [start, end] = range;
    const numbers = paddedLines.slice(0, -1).map(line => line.slice(start, end + 1).trim()).filter(s => s !== '').map(Number);
    const operation = paddedLines[paddedLines.length - 1].slice(start, end + 1).trim();
    const result = operation === '+' ? numbers.reduce((a, b) => a + b, 0) : numbers.reduce((a, b) => a * b, 1);
    total += result;
  }
  console.log(total);

  /**
   * Return the total
   */
  return total;
}

export function solveDay06Part2(input: string): number {
  // TODO: Implement part 2
  return 0;
}

