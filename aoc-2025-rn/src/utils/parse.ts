/**
 * Parse input string into lines, filtering out empty lines
 */
export function parseLines(input: string): string[] {
  return input.trim().split('\n').filter(line => line.length > 0);
}

/**
 * Parse input string into lines, keeping empty lines
 */
export function parseLinesWithEmpty(input: string): string[] {
  return input.trim().split('\n');
}

/**
 * Parse input into groups separated by blank lines
 */
export function parseGroups(input: string): string[][] {
  return input.trim().split('\n\n').map(group => group.split('\n'));
}

/**
 * Parse a line of numbers separated by whitespace
 */
export function parseNumbers(line: string): number[] {
  return line.trim().split(/\s+/).map(Number);
}

/**
 * Parse input into a 2D grid of characters
 */
export function parseGrid(input: string): string[][] {
  return parseLines(input).map(line => line.split(''));
}

/**
 * Parse input into a 2D grid of numbers
 */
export function parseNumberGrid(input: string): number[][] {
  return parseLines(input).map(line => line.split('').map(Number));
}
