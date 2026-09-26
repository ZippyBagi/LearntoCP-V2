The daily earnings of a company are known for $n$ days, numbered $0$ to $n-1$. Your task is to answer $m$ questions: for a period given by its first day $a$ and last day $b$, what are the total earnings of the company in that period?

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains an integer $n$ - the number of days.
- The next line contains $n$ integers - the earnings for each day.
- The next line contains an integer $m$ - the number of questions.
- Each of the next $m$ lines contains two integers $a$ and $b$ - the first and the last day of a period.

## Output

For every question print a single line with the total earnings from day $a$ to day $b$.

## Example

```Input
1
5
1 2 3 4 5
3
0 4
1 3
2 2
```

```Output
15
9
3
```

The whole period earns $1 + 2 + 3 + 4 + 5 = 15$, days $1$ to $3$ earn $2 + 3 + 4 = 9$, and day $2$ alone earns $3$.

## Constraints

$1 \le t \le 100$
$1 \le n, m \le 2 \cdot 10^5$
$0 \le a \le b < n$
The earnings of a single day are between $0$ and $10^9$.
Both the sum of $n$ and the sum of $m$ over all testcases are at most $2 \cdot 10^5$.

---

*This problem was adapted, with permission, from [Zbirovi segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/sume_segmenata), authored by Društvo matematičara Srbije and Fondacija Petlja.*
