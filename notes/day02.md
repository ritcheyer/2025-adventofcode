# Day 1, Part 1 Notes

## Reconstruct the rules

* The ranges are separated by commas (,)

* Each range gives its first ID and last ID separated by a dash (-).

* Find the invalid IDs by looking for any ID which is made only of some sequence of digits repeated twice.
* Invalid ideas:
  * 55 (5 twice)
  * 6464 (64 twice)
  * 123123 (123 twice)

* Find all of the invalid IDs that appear within the given ranges.

* if id has leading zero, it is not an ID and should be ignored

* Adding up all the invalid IDs

* An invalid ID is always an even number of digits, therefore, we can eliminate all IDs with an odd number of digits.

----

11-22 has two invalid IDs, 11 and 22.
95-115 has one invalid ID, 99.
998-1012 has one invalid ID, 1010.
1188511880-1188511890 has one invalid ID, 1188511885.
222220-222224 has one invalid ID, 222222.
1698522-1698528 contains no invalid IDs.
446443-446449 has one invalid ID, 446446.
38593856-38593862 has one invalid ID, 38593859.
The rest of the ranges contain no invalid IDs.

----

* The example produces 1227775554.

## Pseudo-code - part 1

```plaintext

let invalidIds = [];

for each range in the sequence
  split each range into first and last ID on the -
    firstId = first[0]
    lastId = last[1]
    convert firstId and lastId to integers

    // Loop through each ID in the range
    for (let i = firstId; i <= lastId; i++)
      const currentId = i;

      // Convert currentId to string
      const currentIdString = currentId.toString();
      const currentIdLength = currentIdString.length;

      // skip the currentId if it is an odd number of digits (length is odd)
      const idIsOdd = currentIdLength % 2 !== 0;

      // move to the next if the currentId is odd
      if (idIsOdd) continue;

      // Split currentId into 2 halves and check them against each other for equality.
      const currentIdHalf = currentIdLength / 2;
      const leftSide = currentIdString.substring(0, currentIdHalf);
      const rightSide = currentIdString.substring(currentIdHalf);

      // if the left side is equal to the right side, add it to the invalidIds array
      if (leftSide === rightSide)
        invalidIds.push(currentId);

  // Add all invalidIds together
  const sum = invalidIds.reduce((a, b) => a + b, 0);
  console.log(sum); // expected output: 1227775554
```

## Pseudo-code - part 2

* Skip single-digit numbers (length < 2)
* Find all divisors of the **length** that are <= `length / 2` since that's the longest valid pattern.
* For each divisor `d`, check if repeating the **first `d` characters** works
* if any divisor works => it's invalid => add to array
* sum up the invalidIds.
