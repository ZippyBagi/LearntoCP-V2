A city planner is checking a stack of road proposals. Each proposal is a straight stretch of road between two points, and before anything gets built she needs to know which pairs of roads would run into each other.

You are given $t$ pairs of segments. For each pair decide whether the two segments have **at least one common point**. A single shared point is enough - it does not matter whether the segments cross properly, only touch at an endpoint, or lie on top of each other along a whole stretch.

## Input

The first line contains a single integer $t$ - the number of testcases.

Each of the next $t$ lines contains eight integers $A_x$, $A_y$, $B_x$, $B_y$, $C_x$, $C_y$, $D_x$, $D_y$ - the first segment goes from $A$ to $B$ and the second one from $C$ to $D$.

## Output

For every testcase print `YES` if the two segments have a common point, and `NO` otherwise.

## Example

```Input
5
0 0 4 4 0 4 4 0
0 0 4 4 0 10 10 0
0 0 4 4 4 4 8 0
0 0 4 4 2 2 6 6
0 0 4 4 1 0 5 4
```

```Output
YES
NO
YES
YES
NO
```

The first pair crosses in the middle, at $(2, 2)$. In the second pair the two infinite lines do cross, but the segments themselves stop long before that. The third pair touches at the single point $(4, 4)$, the fourth pair lies on the same line and overlaps between $(2, 2)$ and $(4, 4)$, and the fifth pair is parallel.

## Constraints

$1 \le t \le 10^4$
$-10^9 \le A_x, A_y, B_x, B_y, C_x, C_y, D_x, D_y \le 10^9$
$A \ne B$ and $C \ne D$
