An **inversion** in an array is a pair of positions where the earlier element is the bigger one - formally, positions $i < j$ with $b_i > b_j$.

You are given an array $a$ of $n$ positive integers. Pick two positions $l$ and $r$ with $1 \le l < r \le n$, cut out everything strictly between them, and you are left with

$$b = a_1 a_2 \dots a_l \; a_r a_{r+1} \dots a_n$$

Note that $r = l + 1$ cuts out nothing at all, so $b$ is then the whole array.

Count the pairs $(l, r)$ for which the array $b$ has **at most** $k$ inversions.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains two integers $n$ and $k$ - the length of the array and the largest number of inversions allowed.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$.

## Output

For every testcase print a single line with the number of pairs $(l, r)$ that leave at most $k$ inversions.

## Example

```Input
4
3 1
1 3 2
3 0
1 3 2
5 2
1 5 4 1 100
5 4
1 5 4 1 100
```

```Output
3
1
6
10
```

The first two testcases use the same array $1, 3, 2$, which has three possible pairs. The pair $(1, 3)$ leaves $b = 1, 2$ with no inversions; the pairs $(1, 2)$ and $(2, 3)$ both cut out nothing and leave the whole array, which has one inversion. So one pair works when $k = 0$ and all three work when $k = 1$. In the last testcase every one of the $10$ pairs stays within $4$ inversions.

## Constraints

$1 \le t \le 10$
$2 \le n \le 10^5$
$0 \le k \le 10^{18}$
$1 \le a_i \le 10^9$
The sum of $n$ over all testcases does not exceed $2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Inverzije nakon izbacivanja segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/inverzije_nakon_izbacivanja_segmenata), authored by Društvo matematičara Srbije and Fondacija Petlja.*
