For an array $a$ and two positions $l \le r$, write

$$f(l, r) = a_l \mathbin{\&} a_{l+1} \mathbin{\&} \dots \mathbin{\&} a_r$$

where $\&$ is the bitwise AND.

You are given the array and then $q$ questions. Each one gives a starting position $l$ and a threshold $k$, and asks for the **largest** $r$ with $l \le r \le n$ such that $f(l, r) \ge k$ - that is, how far to the right the segment can be stretched before its AND drops below $k$.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains a single integer $n$ - the length of the array.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$.
The third line contains a single integer $q$ - the number of questions.
Each of the next $q$ lines contains two integers $l$ and $k$ - the starting position and the threshold.

Positions are counted **from $1$**.

## Output

For every testcase print one line holding the answers to its $q$ questions, in order, separated by spaces. If even $f(l, l)$ is already below $k$, print $-1$ for that question.

## Example

```Input
3
5
15 14 17 42 34
3
1 7
2 15
4 5
5
7 5 3 1 7
4
1 7
5 7
2 3
2 2
7
19 20 15 12 21 7 11
4
1 15
4 4
7 12
5 7
```

```Output
2 -1 5
1 5 2 2
2 6 -1 5
```

Take the first question of the first testcase. Starting at $l = 1$, the ANDs are $f(1,1) = 15$, $f(1,2) = 14$, and $f(1,3) = f(1,4) = f(1,5) = 0$, so $r = 2$ is the furthest that stays at $7$ or above. The second question starts at $l = 2$, where $a_2 = 14$ is already below $15$, so the answer is $-1$.

## Constraints

$1 \le t \le 10^4$
$1 \le n \le 2 \cdot 10^5$
$1 \le q \le 10^5$
$1 \le a_i \le 10^9$
$1 \le l \le n$ and $1 \le k \le 10^9$
The sum of $n$ over all testcases does not exceed $2 \cdot 10^5$, and so does the sum of $q$

---

*This problem is based on [Iva & Pav](https://codeforces.com/problemset/problem/1878/E), problem 1878E from Codeforces Round 900, by Mike Mirzayanov and the Codeforces team. The statement here is our own.*
