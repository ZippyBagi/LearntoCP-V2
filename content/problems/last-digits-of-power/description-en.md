For given positive integers $a$, $n$ and $k$, your task is to print the last $k$ digits of the power $a^n$.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains three integers $a$, $n$ and $k$.

## Output

For every testcase print a single line with **exactly** $k$ characters - the last (rightmost) $k$ digits of $a^n$, including leading zeros.

## Example

```Input
3
2 13 3
10 5 3
3452 20 4
```

```Output
192
000
0576
```

$2^{13} = 8192$, so its last three digits are $192$. $10^5 = 100000$ ends in three zeros - all three must be printed.

## Constraints

$1 \le t \le 10^5$
$1 \le a, n \le 10^9$
$1 \le k \le 9$

---

*This problem was adapted, with permission, from [Poslednjih k cifara stepena](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/poslednjih_k_cifara_stepena), authored by Društvo matematičara Srbije and Fondacija Petlja.*
