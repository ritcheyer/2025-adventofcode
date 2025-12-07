import { parseGroups } from '../utils/parse';

function isIdBetween(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}
export function solveDay05Part1(input: string): number {
  const [groups, ids] = parseGroups(input);

  /**
   * This is an optimization of the logic to go with a filtering of the IDs.
   * Instead of looping over groups and mutating the IDs, flip the logic!
   * Loop through the IDs first
   * Exit if an ID is found to be within the range, preventing mutation
   * Increment a counter when a fresh Id is found
   */
  return ids.filter((id) =>
    groups.some((group) => {
      const [groupMin, groupMax] = group.split('-').map(Number);
      return isIdBetween(Number(id), groupMin, groupMax);
    })).length;

  /**
   * Keeping this logic around as it was my first successful attemp.
   *

  let count = 0;
  ids.forEach((id) => {
    groups.some((group) => {

      const [groupMin, groupMax] = group.split('-').map(Number);

      if (isIdBetween(Number(id), groupMin, groupMax)) {
        count++;
        return true;
      }
    });
  });
  return count;
  */
}

export function solveDay05Part2(input: string): number {
  const lines = parseGroups(input);

  // TODO: Implement solution
  return 0;
}

