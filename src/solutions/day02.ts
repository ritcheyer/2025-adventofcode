import { parseLines } from '../utils/parse';

export function solveDay02Part1(input: string): number {
  const lines = parseLines(input);

  const invalidIds: number[] = [];

  // split the line into ranges
  const ranges = lines[0].split(',');

  // split the range into first and last ID
  ranges.forEach((range) => {

    const [firstId, lastId] = range.split('-');
    const firstIdInt = parseInt(firstId);
    const lastIdInt = parseInt(lastId);

    // console.log(firstIdInt, lastIdInt);

    // Loop through each ID in the range
    for (let i = firstIdInt; i <= lastIdInt; i++) {

      const currentId = i;
      // console.log(currentId);

      // Convert currentId to string
      const currentIdString = currentId.toString();
      const currentIdLength = currentIdString.length;

      // skip the currentId if the length is odd.
      if (currentIdLength % 2 !== 0) {
        continue;
      }

      // console.log(currentIdString, currentIdLength);

      const currentIdHalf = currentIdLength / 2;
      const leftSide = currentIdString.substring(0, currentIdHalf);
      const rightSide = currentIdString.substring(currentIdHalf);

      // console.log(leftSide, rightSide);

      // if the left is exactly equal to the right, add the currentId to the invalidIds array
      if (leftSide === rightSide) {
        invalidIds.push(currentId);
        // console.log('true',currentId);
      }

      // console.log(invalidIds);
    }


  });
  const sum = invalidIds.reduce((a, b) => a + b, 0);

  return sum;
}

export function solveDay02Part2(input: string): number {
  const lines = parseLines(input);

  // create an array to hold all invalid IDs
  const invalidIds: number[] = [];

  // split the line into ranges
  const ranges = lines[0].split(',');

  // split the range into first and last ID
  ranges.forEach((range) => {

    const [firstId, lastId] = range.split('-');
    const firstIdInt = parseInt(firstId);
    const lastIdInt = parseInt(lastId);

    // console.log('firstIdInt', firstIdInt);
    // console.log('lastIdInt', lastIdInt);

    for (let i = firstIdInt; i <= lastIdInt; i++) {
      const validDivisors: number[] = [];
      const currentId = i;
      // console.log('currentId', currentId);


      const currentIdString = currentId.toString();
      const currentIdLength = currentIdString.length;
      // console.log('currentIdLength', currentIdLength);
      // console.log('currentIdString', currentIdString);

      // skip the currentId if the length is less than 2
      if (currentIdLength < 2) {
        continue;
      }

      // find all divisors of the currentIdLength that are <= currentIdLength / 2
      for (let divisor = 1; divisor <= currentIdLength / 2; divisor++) {
        if (currentIdLength % divisor === 0) {
          validDivisors.push(divisor);
        }
      }
      // console.log('validDivisors', validDivisors);

      validDivisors.some((divisor) => {
        // console.log('divisor', divisor);

        const repeats = currentIdLength / divisor;
        const substring = currentIdString.substring(0, divisor);
        // console.log('substring', substring);
        // console.log('repeats', repeats);

        // console.log(
        //   `original substring: ${substring}`,
        //   `repeated substring: ${substring.repeat(repeats)}`,
        //   `equals: ${substring === substring.repeat(repeats)}`
        // );

        if (currentIdString === substring.repeat(repeats)) {
          invalidIds.push(currentId);
          return true;
        }
      });
    }


  });

  const sum = invalidIds.reduce((a, b) => a + b, 0);

  console.log('sum', sum);

  return sum;
}

