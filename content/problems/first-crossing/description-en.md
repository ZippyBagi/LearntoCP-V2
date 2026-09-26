An $n \times n$ grid starts out full of zeros. Then ones are written into it, one cell at a time, in a given order.

You may walk across the grid by stepping between cells that hold a one, moving only **up, down, left or right** - never diagonally. Crossing the grid means starting on any cell of the **top row** and reaching any cell of the **bottom row** this way.

After each one is written, the grid may or may not be crossable. Find how many ones have to be written before it becomes crossable for the first time.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains two integers $n$ and $m$ - the side of the grid and how many ones will be written.
Each of the next $m$ lines contains two integers $r$ and $c$ - the row and column of the next one, both counted **from $0$**.

No cell is listed twice.

## Output

For every testcase print a single line with the number of ones written when the grid first becomes crossable, or $-1$ if it never does.

## Example

```Input
3
4 9
0 0
0 1
1 1
3 3
1 3
2 0
3 0
2 1
2 2
1 1
0 0
3 2
0 0
2 2
```

```Output
8
1
-1
```

After the eighth one the first grid looks like this, and the marked cells lead from the top row to the bottom:

```
1100
0101
1100
1001
```

In the second testcase the grid is a single cell, which is both the top row and the bottom row, so one write is enough. In the third the two ones sit in opposite corners and never touch.

## Constraints

$1 \le t \le 10$
$1 \le n \le 200$
$1 \le m \le n^2$
$0 \le r, c \le n-1$
The sum of $m$ over all testcases does not exceed $10^5$

---

*This problem was adapted, with permission, from [Prvi put kroz matricu](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/prvi_put_kroz_matricu), authored by Društvo matematičara Srbije and Fondacija Petlja.*
