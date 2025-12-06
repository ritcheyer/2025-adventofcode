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

## Pseudo-code

```
for each range in the sequence
  split each range into first and last ID on the -
    firstId = first[0]
    lastId = last[1]
    convert firstId and lastId to integers

    ignore firstId or lastId if:
      either has a leading zero
      does not have an even number of digits

```
