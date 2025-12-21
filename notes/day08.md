# Day 8

## Part 1

### Notes

Figure out the distance between two 3D points using the 3D Euclidean Distance Formula:
d=sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}+(z_{2}-z_{1})^{2}}

Loop through each set of points and calculate the distance between them.
The distance between two points is the length of the line segment connecting them.

If two points are close, we connect them with a junction box

Store "Box A", "Box B", and the distance between them something like:

```plaintext
{A,B,distance}
{A,C,distance}
{A,D,distance}
{B,C,distance}
{B,D,distance}
{C,D,distance}
```

Sort the objects by distance in ascending order (smallest first).

Process the first **10 connections** (example) or **1000 connections** (real input).

**Important**: If two boxes are already in the same circuit, the connection still counts toward your 1000 — but nothing changes about the circuits.

**Final step**: After all connections, find the **3 largest circuits** and **multiply their sizes** together. That's the answer.

---

I'm currently stuck here:
> #3: reduce() could work for iterating through the pairs — it's really just a loop that carries state forward. But the question isn't so much how you loop, it's what state you're updating each iteration.
> Think of it this way: before you start connecting, you have N boxes, each in its own "circuit." After connecting some pairs, some boxes share a circuit.
> What would that state look like? An array? An object/map? Something that answers "given box X, what circuit is it in?"


### Pseudo-code

```typescript

// Use the 3D Euclidean Distance Formula to calculate the distance between two points in 3D space
function distance3D(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}


```

## Part 2

### Notes



### Pseudo-code

```plaintext

```
