import { parseLines } from '../utils/parse';


export function solveDay01Part1(input: string): number {
  const sequence = parseLines(input);

  const initialValue = 100;
  let dialValue = 50;
  let instructionValue = 0;
  let passwordCount = 0;

  sequence.forEach(instruction => {
    // string replace L with minus sign
    instruction = instruction.replace('L', '-');

    // string replace R with plus sign
    instruction = instruction.replace('R', '+');

    // Convert from string to integer
    instructionValue = parseInt(instruction);

    // recalculate the dialValue after the instruction
    let equation = initialValue + dialValue + instructionValue;

    // if the equation is a multiple of 100, increment the password count
    if (equation % 100 === 0) {
      passwordCount++;
    }

    // the new dial value is the current location on the dial after the instruction
    dialValue = equation;

  });

  return passwordCount;
}

export function solveDay01Part2(input: string): number {
  const sequence = parseLines(input);

  const initialValue = 100;
  let startValue = 50;
  let position = 50;
  let instructionValue = 0;
  let passwordCount = 0;
  let centuryBefore = 0;
  let centuryAfter = 0;
  let crossings = 0;

  sequence.forEach((instruction) => {
    // string replace L with minus sign
    instruction = instruction.replace('L', '-');

    // string replace R with plus sign
    instruction = instruction.replace('R', '+');

    // Convert from string to integer
    instructionValue = parseInt(instruction);

    // recalculate the dialValue after the instruction
    let equation = initialValue + startValue + instructionValue;

    if (instructionValue < 0) {
      // L movement - use adjusted formula
      centuryBefore = Math.floor((position - 1) / 100);
      centuryAfter = Math.floor((position + instructionValue - 1) / 100);
      crossings = centuryBefore - centuryAfter;
    } else {
      // R movement - use regular formula
      centuryBefore = Math.floor(position / 100);
      centuryAfter = Math.floor((position + instructionValue) / 100);
      crossings = centuryAfter - centuryBefore;
    }

    // update counter and passwordCount after each instruction to keep track of crossings
    passwordCount += crossings;
    position = position + instructionValue;

    // the new dial value is the current location on the dial after the instruction
    startValue = equation;
  });

  return passwordCount;
}


