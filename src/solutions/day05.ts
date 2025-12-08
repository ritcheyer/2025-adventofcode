import { parseGroups } from '../utils/parse';

function isIdBetween(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}


export function solveDay05Part1(input: string): number {
  const [ranges, ids] = parseGroups(input);

  /**
   * This is an optimization of the logic to go with a filtering of the IDs.
   * Instead of looping over groups and mutating the IDs, flip the logic!
   * Loop through the IDs first
   * Exit if an ID is found to be within the range, preventing mutation
   * Increment a counter when a fresh Id is found
   */
  return ids.filter((id) =>
    ranges.some((range) => {
      const [rangeMin, rangeMax] = range.split('-').map(Number);
      return isIdBetween(Number(id), rangeMin, rangeMax);
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
  const [ranges, ids] = parseGroups(input);
  let mergedRanges: string[] = [];

  /**
   * Sort the ranges by the min
   * Range Logic:
   * if minOfRange2 <= maxOfRange1, they overlap and can be merged
   * if minOfRange2 > maxOfRange1, they do not overlap and cannot be merged
   */
  const sortedRanges = ranges.sort((a, b) => {
    const [aMin, aMax] = a.split('-').map(Number);
    const [bMin, bMax] = b.split('-').map(Number);
    return aMin - bMin;
  });

  /**
   * Merge the ranges if they overlap
   * If they do not overlap, add the range to the mergedRanges array
   * If they do overlap, update the last merged range to the larger of the two maxes
   * Return the mergedRanges array
   */
  sortedRanges.forEach((range, index) => {
    const [currRangeMin, currRangeMax] = range.split('-').map(Number);

    if (index === 0) {
      mergedRanges.push(range);
    } else {

      const [prevRangeMin, prevRangeMax] =
        mergedRanges[mergedRanges.length - 1].split('-').map(Number);

      if (currRangeMin <= prevRangeMax) {
        mergedRanges[mergedRanges.length - 1] = `${prevRangeMin}-${Math.max(prevRangeMax, currRangeMax)}`;  // update last merged range
      } else {
        mergedRanges.push(range);
      }
    }
  });

  /**
   * Sum the total number of IDs in the merged ranges
   */
  return mergedRanges.reduce((total, range) => {
    const [min, max] = range.split('-').map(Number);
    return total + (max - min + 1);
  }, 0);
}
