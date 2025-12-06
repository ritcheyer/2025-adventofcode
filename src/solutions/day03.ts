import { parseLines } from '../utils/parse';

export function solveDay03Part1(input: string): number {
  const joltageLines = parseLines(input);

  const joltages: number[] = [];

  // console.log('Joltage Lines:', joltageLines.length);

  // reusable function to find the largest digit in a string
  function findLargestDigit(joltageLine: string): number {
    const digits = joltageLine.split('').map(Number);
    return Math.max(...digits);
  }

  function isLargestDigitLast(joltageLine: string): boolean {
    const digits = joltageLine.split('').map(Number);
    return digits[digits.length - 1] === Math.max(...digits);
  }

  joltageLines.forEach((joltageLine) => {
    // console.log('Joltage Line:', joltageLine);

    let tensPlace = 0;
    let onesPlace = 0;
    let tensPlaceString = '';
    let tensIndex = 0;

    if (isLargestDigitLast(joltageLine)) {
      tensPlaceString = joltageLine.slice(0, -1);
    } else {
      tensPlaceString = joltageLine;
    }

    tensPlace = findLargestDigit(tensPlaceString);
    tensIndex = tensPlaceString.indexOf(tensPlace.toString());
    onesPlace = findLargestDigit(joltageLine.slice(tensIndex + 1));

    let joltage = tensPlace * 10 + onesPlace;

    joltages.push(joltage);
  });

  const sum = joltages.reduce((a, b) => a + b, 0);
  console.log('sum', sum);
  return sum;
}

export function solveDay03Part2(input: string): number {
  const lines = parseLines(input);

  // TODO: Implement part 2

  return 0;
}
