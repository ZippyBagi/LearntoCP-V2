Call a positive integer **classy** if its decimal representation contains **no more than $3$** non-zero digits. So $4$, $200000$ and $10203$ are classy, while $4231$, $102306$ and $7277420000$ are not.

You are given a segment $[l, r]$. Count how many classy integers $x$ satisfy $l \le x \le r$.

## Input

First line of input will be a single integer $t$ - the number of segments.
Each of the next $t$ lines contains two integers $l$ and $r$ - the ends of one segment, both included.

## Output

For every segment print a single line with the number of classy integers inside it.

## Example

```Input
4
1 1000
1024 1024
65536 65536
999999 1000001
```

```Output
1000
1
0
2
```

Every number from $1$ to $999$ has at most three digits, so it cannot have more than three non-zero ones, and $1000$ has a single non-zero digit - all $1000$ are classy. $1024$ has three non-zero digits and $65536$ has five. In the last segment $999999$ has six non-zero digits, while $1000000$ and $1000001$ have one and two.

## Constraints

$1 \le t \le 10^4$
$1 \le l \le r \le 10^{18}$

---

*This problem is based on [Classy Numbers](https://codeforces.com/problemset/problem/1036/C), problem 1036C from Educational Codeforces Round 50, by Mike Mirzayanov and the Codeforces team. The statement here is our own.*
