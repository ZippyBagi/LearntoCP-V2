A restaurant offers a menu of $n$ dishes, and you have decided to order exactly $m$ of them, all different. Dish $i$ on its own gives you $a_i$ units of enjoyment.

Some dishes taste better in a particular order, though. The chef has written down $k$ pairings: a pairing $x, y, c$ means that if you eat dish $y$ **immediately after** dish $x$, with nothing in between, you gain another $c$ units on top. A pairing only counts in the direction it is written.

You may eat your $m$ dishes in any order you like. Find the largest total enjoyment you can reach.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains three integers $n$, $m$ and $k$ - the number of dishes on the menu, the number you will order, and the number of pairings.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$ - the enjoyment each dish gives on its own.
Each of the next $k$ lines contains three integers $x$, $y$ and $c$ - eating dish $y$ immediately after dish $x$ gives $c$ extra enjoyment.

Dishes are numbered $1$ to $n$. No pairing $(x, y)$ is listed twice.

## Output

For every testcase print a single line with the largest total enjoyment.

## Example

```Input
2
2 2 1
1 1
2 1 1
4 3 2
1 2 3 4
2 1 5
3 4 2
```

```Output
3
12
```

In the first testcase eat dish $2$ and then dish $1$: one unit from each dish, plus one more for the pairing. In the second, ordering dishes $4, 2, 1$ gives $4 + 2 + 1 = 7$ from the dishes themselves, and the pairing $2 \rightarrow 1$ adds $5$ - the order $2, 1, 4$ scores the same $12$.

## Constraints

$1 \le t \le 5$
$1 \le m \le n \le 18$
$0 \le k \le n \cdot (n-1)$
$0 \le a_i \le 10^9$
$1 \le x, y \le n$ with $x \ne y$, and $0 \le c \le 10^9$

---

*This problem is based on [Kefa and Dishes](https://codeforces.com/problemset/problem/580/D), problem 580D from Codeforces Round 321, by Mike Mirzayanov and the Codeforces team. The statement here is our own.*
