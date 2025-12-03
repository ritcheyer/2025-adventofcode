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

