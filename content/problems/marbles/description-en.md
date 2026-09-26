Marko has laid $n$ coloured marbles out in a row. He likes things tidy, so he wants every colour to end up in **one solid block**: for each colour, all marbles of that colour standing next to each other, with nothing of another colour in between.

The only move he is allowed is to pick two **neighbouring** marbles and swap them.

Find the smallest number of swaps that gets the row tidy. The blocks may end up in any order - all that matters is that each colour forms exactly one of them.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains a single integer $n$ - the number of marbles.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$ - the colour of each marble, in the order they are lying.

## Output

For every testcase print a single line with the smallest number of swaps needed.

## Example

```Input
3
7
3 4 2 3 4 2 2
5
20 1 14 10 2
13
5 5 4 4 3 5 7 6 5 4 4 6 5
```

```Output
3
0
21
```

In the first testcase three swaps are enough: swapping the third and fourth marbles gives $3, 4, 3, 2, 4, 2, 2$, then the second and third gives $3, 3, 4, 2, 4, 2, 2$, and finally the fourth and fifth gives $3, 3, 4, 4, 2, 2, 2$. In the second every colour appears once, so the row is already tidy.

## Constraints

$1 \le t \le 5$
$2 \le n \le 4 \cdot 10^5$
$1 \le a_i \le 20$
The sum of $n$ over all testcases does not exceed $4 \cdot 10^5$

---

*This problem is based on [Marbles](https://codeforces.com/problemset/problem/1215/E), problem 1215E from Codeforces Round 585, by Mike Mirzayanov and the Codeforces team. The statement here is our own.*
