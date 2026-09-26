A workshop has $n$ sensors lying on a table, and the $i$-th of them has an id $a_i$. Two sensors can be linked together only if they are **strong together**, which the manual defines like this: sensors $i$ and $j$ form a strong pair when

$$a_i \, \& \, a_j \ge a_i \oplus a_j$$

where $\&$ denotes the bitwise AND operation and $\oplus$ denotes the bitwise XOR operation.

Count how many strong pairs $(i, j)$ with $i < j$ there are. Two sensors lying at different places on the table are always a different pair, even when they happen to carry the same id.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each testcase takes two lines. The first line has a single integer $n$ - the number of sensors. The second line has $n$ integers $a_1, a_2, \ldots, a_n$ - their ids.

## Output

For every testcase print a single line with the number of strong pairs.

## Example

```Input
3
5
1 4 3 7 10
4
6 2 5 3
2
2 4
```

```Output
1
2
0
```

In the first testcase the only strong pair is $(4, 7)$, because $4 \, \& \, 7 = 4$ while $4 \oplus 7 = 3$. In the third testcase $2 \, \& \, 4 = 0$ and $2 \oplus 4 = 6$, so that pair is not strong and the answer is $0$.

## Constraints

$1 \le t \le 10$
$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
The sum of $n$ over all testcases does not exceed $10^5$.

---

This problem was adapted from [Rock and Lever](https://codeforces.com/contest/1420/problem/B), problem B of Codeforces Round 672 (Div. 2).
