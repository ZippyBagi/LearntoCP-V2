Concatenating two numbers $x$ and $y$ means writing the digits of $y$ right after the digits of $x$: concatenating $123$ and $45$ gives $12345$. Given an array of numbers, your task is to find the **smallest** number that can be obtained by concatenating all of them, each used exactly once, in some order.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each testcase consists of two lines: the first contains an integer $n$ - the number of elements, and the second contains $n$ integers $a_0, a_1, \ldots, a_{n-1}$.

## Output

For every testcase print a single line with the smallest number obtainable by concatenating all the given numbers.

## Example

```Input
2
5
32 11 987 12 3
2
91919 919191
```

```Output
1112323987
91919191919
```

In the first testcase the order $11, 12, 32, 3, 987$ gives the smallest result - note that $32$ comes **before** $3$. In the second, starting with $919191$ beats starting with $91919$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 10^5$

---

*This problem was adapted, with permission, from [Najmanji broj nadovezivanjem više brojeva](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/najmanji_broj_nadovezivanjem), authored by Društvo matematičara Srbije and Fondacija Petlja.*
