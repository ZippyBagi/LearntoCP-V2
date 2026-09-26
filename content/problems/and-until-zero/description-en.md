An old machine has a single register. You load the number $n$ into it, and then the machine starts counting down: it ANDs the register with $n - 1$, then with $n - 2$, then with $n - 3$, and so on, one number at a time.

Sooner or later the register turns into $0$, and once it does it can never come back. Your task is to report the number the machine was at in that moment.

Formally, find the largest $k$ for which

$$n \, \& \, (n-1) \, \& \, (n-2) \, \& \, \ldots \, \& \, k = 0$$

where $\&$ denotes the bitwise AND operation. The value $k = 0$ is allowed - the machine is happy to count all the way down.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains a single integer $n$ - the number loaded into the register.

## Output

For every testcase print a single line with the largest such $k$.

## Example

```Input
4
2
5
17
1
```

```Output
1
3
15
0
```

For $n = 5$ the machine first does $5 \, \& \, 4 = 4$, which is not $0$ yet, and then $4 \, \& \, 3 = 0$ - so it stopped at $3$. For $n = 1$ the register holds $1$ the whole time and only $1 \, \& \, 0$ empties it, so the answer is $0$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 10^9$

---

This problem was adapted from [And Then There Were K](https://codeforces.com/contest/1527/problem/A), problem A of Codeforces Round 721 (Div. 2).
