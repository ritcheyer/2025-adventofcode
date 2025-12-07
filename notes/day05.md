# Day 5

## Part 1

### Notes

- Instead of looping over groups and mutating the IDs, flip the logic!
- Loop through the IDs first
- Exit if an ID is found to be within the range, preventing mutation
- Increment a counter when a fresh Id is found



### Pseudo-code

```plaintext
function isIdBetween(id,min,max)
  logic to determine if id is between min and max

foreach id in ids
  foreach group in groups
    split on '-' and map to numbers
      if isIdBetween(id,min,max)
        count++
        break
      else
        continue
```

## Part 2

### Notes



