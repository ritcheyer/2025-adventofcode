# Day 3 Notes

## Problem Summary

* Given a list of numbers, pick the two largest single digits
* Once the largest has been picked, anything to the left (inclusive) is no longer valid and can be discarded.
  * NOTE: if the largest number in the string is at the last position, it cannot be the first digit.
* Find the next largest number in the sequence.
* Discard all other numbers (e.g., move on to the next step)
* Add the largest joltage into an array
* Repeat until all numbers have been processed.
* Sum all the joltages in the array

### How to compare numbers

* split into individual digits (split('')) => map to an array
* math.max the array
* return the largest value.
* split the original string based on the largest value. discard the first part of the string.
* perform math.max function on 2nd part of the string
* combine both numbers and store in an array
* repeat until all numbers have been processed.

## Pseudo-code - Part 1

```plaintext
numberString = '1234578902345'
let tensPlace = 0;
let onesPlace = 0;

const joltages: number[] = [];

// reusable function to find the largest single digit given a string
function findLargestDigit(string) {
  const digits = string.split('').map(Number);
  const largestNumber = Math.max(...digits);

  return largestNumber;
}

// find out if the largest digit is in the last position
function isLargestDigitLast(numbers) {
  // ensure input is a string
  if (typeof numbers !== 'string' || numbers.length === 0) {
    return false; // Handle invalid input
  }

  // 1. Extract the last digit
  const lastDigit = parseInt(numbers[numbers.length - 1]);

  // 2. Find the maximum digit
  let maxDigit = -1; // Initialize with a value lower than any possible digit
  for (let i = 0; i < numbers.length; i++) {
    const currentDigit = parseInt(numbers[i]);
    if (!isNaN(currentDigit) && currentDigit > maxDigit) {
      maxDigit = currentDigit;
    }
  }

  // 3. Compare
  return lastDigit === maxDigit;

}

// find the 10s place and the 1s place based on the 10s place.

if isLargestDigitLast(numberString) {
  tensPlaceString = numberString.slice(0, -1);
} else {
  tensPlaceString = numberString;
}

tensPlace = findLargestDigit(tensPlaceString);
tensIndex = tensPlaceString.indexOf(tensPlace.toString())
onesPlace = findLargestDigit(numberString.slice(tensIndex + 1));

let joltage = parseInt(tensPlace+onesPlace)
joltages.push(joltage);


const sum = joltages.reduce((a, b) => a + b, 0);
console.log('sum', sum);
return sum;

```

## Pseudo-code - Part 2




```plaintext
// Your approach here
```

