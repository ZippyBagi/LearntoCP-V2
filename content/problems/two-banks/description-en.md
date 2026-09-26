A river runs through a town in a perfectly straight line. On the map the river is given by two different points $A$ and $B$ that it passes through, and it continues forever in both directions.

The town wants to know how its houses are split between the two banks. A house is on the **left bank** if it lies to the left of somebody standing at $A$ and looking towards $B$, and on the **right bank** if it lies to their right. Some houses were built right on top of the river and belong to neither bank.

Your task is to count the houses on each bank.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains a single integer $n$ - the number of houses.
- The second line contains four integers $A_x$, $A_y$, $B_x$, $B_y$ - the two points that define the river. The points are different.
- Each of the next $n$ lines contains two integers $x_i$ and $y_i$ - the position of one house.

## Output

For every testcase print a single line with three integers: the number of houses on the left bank, the number on the right bank, and the number standing on the river.

## Example

```Input
2
5
0 0 4 4
0 4
1 4
4 0
2 2
5 1
3
0 0 1000000000 1000000000
1000000000 -1000000000
-1000000000 1000000000
5 5
```

```Output
2 2 1
1 1 1
```

In the first testcase the river goes diagonally through the origin. The houses at $(0, 4)$ and $(1, 4)$ are above it, the houses at $(4, 0)$ and $(5, 1)$ are below it, and the house at $(2, 2)$ is standing in the water.

## Constraints

$1 \le t \le 10$
$1 \le n \le 10^5$
$-10^9 \le A_x, A_y, B_x, B_y \le 10^9$
$-10^9 \le x_i, y_i \le 10^9$
$A \ne B$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$
