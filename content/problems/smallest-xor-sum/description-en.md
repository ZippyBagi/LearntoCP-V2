A base station controls two robots. The first robot carries the number $a$, the second one carries the number $b$.

Before they start working, the station broadcasts a **key** - a single non-negative integer $x$ that both robots receive. A robot then spends energy equal to its own number XOR the key, so together the two robots spend

$$(a \oplus x) + (b \oplus x)$$

where $\oplus$ denotes the bitwise XOR operation.

The station picks the key, and it can be any non-negative integer. Choose it so that the total spent energy is as small as possible, and print that smallest total.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains two integers $a$ and $b$ - the numbers the two robots carry.

## Output

For every testcase print a single line with the smallest possible total energy.

## Example

```Input
3
6 12
4 9
5 5
```

```Output
10
13
0
```

In the first testcase the key $x = 4$ gives $(6 \oplus 4) + (12 \oplus 4) = 2 + 8 = 10$, and no other key does better. In the third testcase both robots carry the same number, so the key $x = 5$ empties them both.

## Constraints

$1 \le t \le 1000$
$1 \le a, b \le 10^9$

---

This problem was adapted from [XORwice](https://codeforces.com/contest/1421/problem/A), problem A of Codeforces Round 676 (Div. 2).
