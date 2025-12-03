import * as day01 from './day01';
import * as day02 from './day02';

export interface DayInputs {
  example: string;
  input: string;
}

export const inputs: Record<number, DayInputs> = {
  1: day01,
  2: day02,
};

export function getInput(day: number, useExample: boolean): string {
  const dayInputs = inputs[day];
  if (!dayInputs) return '';
  return useExample ? dayInputs.example : dayInputs.input;
}

export function hasInput(day: number): boolean {
  const dayInputs = inputs[day];
  if (!dayInputs) return false;
  // Consider a day "available" if it has either example or real input
  return dayInputs.example.length > 0 || dayInputs.input.length > 0;
}

export function getAvailableDays(): number[] {
  return Object.keys(inputs)
    .map(Number)
    .filter(hasInput)
    .sort((a, b) => a - b);
}

