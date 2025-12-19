import { parseLines } from '../utils/parse';

/**
 * Calculate the total of the problem ranges
 * @param problemRanges - The ranges of numbers to be added or multiplied together
 * @param paddedLines - The padded lines of the input
 * @param extractNumbers - A function to extract the numbers from the data lines
 * @returns The total of the problem ranges
 */
function calculateTotal(
  problemRanges: number[][],
  paddedLines: string[],
  extractNumbers: (dataLines: string[], start: number, end: number) => number[]
): number {
  let total = 0;
  for (let range of problemRanges) {
    const [start, end] = range;
    const numbers = extractNumbers(paddedLines.slice(0, -1), start, end);
    const operation = paddedLines[paddedLines.length - 1]
      .slice(start, end + 1)
      .trim();
    const result =
      operation === '+'
        ? numbers.reduce((a, b) => a + b, 0)
        : numbers.reduce((a, b) => a * b, 1);
    total += result;
  }
  return total;
}

/**
 *
 * @param dataLines - The data lines to extract the numbers from
 * @param start - The start column index
 * @param end - The end column index
 * @returns The numbers extracted from the data lines
 */
const extractNumbersHorizontally = (dataLines: string[], start: number, end: number): number[] => {
  return dataLines.map(line => line.slice(start, end + 1).trim()).filter(s => s !== '').map(Number);
}

/**
 * Extract the numbers vertically from the data lines
 * @param dataLines - The data lines to extract the numbers from
 * @param start - The start column index
 * @param end - The end column index
 * @returns The numbers extracted from the data lines
 */
const extractNumbersVertically = (dataLines: string[], start: number, end: number): number[] => {
  // TODO: Implement vertical extraction
  return dataLines.map(line => line.slice(start, end + 1).trim()).filter(s => s !== '').map(Number);
}

/**
 * Find columns that are entirely spaces (separators between problems)
 * @param paddedLines - The padded lines of the input
 * @returns Array of column indices that are separators
 */
function findSeparatorColumns(paddedLines: string[]): number[] {
  const maxLength = paddedLines[0]?.length ?? 0;
  const separatorColumns: number[] = [];

  for (let columnIndex = 0; columnIndex < maxLength; columnIndex++) {
    let isAllSpaces = true;
    for (let rowIndex = 0; rowIndex < paddedLines.length; rowIndex++) {
      if (paddedLines[rowIndex][columnIndex] !== ' ') {
        isAllSpaces = false;
        break;
      }
    }
    if (isAllSpaces) {
      separatorColumns.push(columnIndex);
    }
  }
  return separatorColumns;
}

/**
 * Find the ranges of columns that form each problem
 * @param separatorColumns - The separator column indices
 * @param maxLength - The max length of the padded lines
 * @returns Array of [start, end] ranges for each problem
 */
function findProblemRanges(separatorColumns: number[], maxLength: number): number[][] {
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
  return problemRanges;
}


/**
 * Solve part 1 of day 6
 *
 * 1. Pad the rows to the same length
 * 2. Find the columns that separate each number to be added or multiplied together
 * 3. Find the ranges of numbers to be added or multiplied together
 * 4. Do the math
 * 5. Return the total
 *
 * @param input - The input string
 * @returns The total of the problem ranges
 */
export function solveDay06Part1(input: string): number {
  const lines = parseLines(input);

  // Pad lines to uniform length
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const paddedLines = lines.map(line => line.padEnd(maxLength, ' '));

  // Find separators and problem ranges
  const separatorColumns = findSeparatorColumns(paddedLines);
  const problemRanges = findProblemRanges(separatorColumns, maxLength);

  return calculateTotal(problemRanges, paddedLines, extractNumbersHorizontally);
}

/**
 * Solve part 2 of day 6
 *
 * 1. Pad the rows to the same length
 * 2. Find the columns that separate each number to be added or multiplied together
 * 3. Find the ranges of numbers to be added or multiplied together
 * 4. Do the math
 * 5. Return the total
 *
 * @param input - The input string
 * @returns The total of the problem ranges
 */
export function solveDay06Part2(input: string): number {
  const lines = parseLines(input);

  // Pad lines to uniform length
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const paddedLines = lines.map(line => line.padEnd(maxLength, ' '));

  // Find separators and problem ranges
  const separatorColumns = findSeparatorColumns(paddedLines);
  const problemRanges = findProblemRanges(separatorColumns, maxLength);

  return calculateTotal(problemRanges, paddedLines, extractNumbersVertically);
}

