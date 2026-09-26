A radio station broadcasts a signal that never stops.

The transmission starts as a single digit, $1$. Every time the operator has written down a block of $2^k$ digits, the station repeats that whole block inverted - every $1$ comes back as a $0$ and every $0$ comes back as a $1$ - and the inverted copy is appended to everything written so far.

So the transcript grows like this:


`1`
`1 0`
`1 0 0 1`
`1 0 0 1 0 1 1 0`


Given a position $n$, report the digit standing at that position. Positions are numbered starting from $1$.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains a single integer $n$ - the position in the signal.

## Output

For every testcase print a single line with the digit ($0$ or $1$) at position $n$.

## Example

```Input
6
1
7
8
15
1234
12345678
```

```Output
1
1
0
0
0
1
```

The signal begins $1, 0, 0, 1, 0, 1, 1, 0, \ldots$, so position $1$ and position $7$ hold a $1$, while position $8$ holds a $0$.

## Constraints

$1 \le t \le 10^5$
$1 \le n \le 10^{18}$

---

This problem was adapted, with permission, from [Morzeov niz](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/morzeov_niz), authored by Društvo matematičara Srbije and Fondacija Petlja.
