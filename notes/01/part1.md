# Day 1, Part 1 Notes

## Reconstruct the rules

* Numbers on a dial 0-99.
* Turning the dial **clockwise** will increment the number from 0.
* Turning the dial **counterclockwise** will decrement the number from 99.
* The dial wraps around from 99 to 0 and from 0 to 99.
* The dial starts at 50.
* Each instruction in the sequence begins with either an L or an R.
* L means left, or decrement.
* R means right, or increment.
* Each letter is followed by N number of digits and a line return.
* The number is how many times the dial is turned.
* The password is the number of times the **dial points to 0 after** any rotation.

## Pseudo-code

for each instruction in the sequence

  split the instruction into direction and number

  Replace L with minus sign (-).
  Replace R with plus sign (+).

  If the number is 4 or longer, remove first digit

  ✅ if instruction is the first in the sequence
  ✅  set the dial to 50
  ✅ else
  ✅  set the dial to the previous value

  ✅ if value is > 100
  ✅  subtract 100 from the value

  ✅ if the dial is 0
  ✅   increment the password by 1
