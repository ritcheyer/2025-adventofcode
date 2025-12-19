# Day 7: Laboratories

## Problem Summary

- Tachyon beam enters at `S` and moves **downward**
- Empty space (`.`) - beams pass through freely
- Splitter (`^`) - beam stops, two NEW beams continue from immediate left and right
- Count: total number of times a beam is split

## Key Observations

1. Beams only move in one direction: **down**
2. When hitting `^`, the original beam is replaced by 2 beams (one left, one right)
3. Multiple beams can converge to the same column (they merge conceptually)
4. Need to count: how many splitter hits occur total

## Example Analysis

```
.......S.......    <- Start at column 7
.......|.......
.......^.......    <- Split #1: beams now at cols 6 and 8
......|.|......
......^.^......    <- Split #2 and #3: now cols 5, 7, 9 (middle merged)
```

The example has 21 total splits.

## Approach Ideas

- ?

## Data Structures

- Grid parsing (find S position, find all ^ positions)
- Track active beam positions as they descend row by row?
- Or think about it differently...

## Part 1

Answer:

## Part 2

(Not yet revealed)

