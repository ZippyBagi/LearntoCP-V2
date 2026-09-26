Ants, bees and mosquitoes are organizing a sports tournament. They want to split into teams so that every team consists of a single insect kind, all teams have the **same number of members**, and every insect is in exactly one team. Given the number of insects of each kind, your task is to determine the largest possible team size.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains three integers $a$, $b$ and $c$ - the number of ants, bees and mosquitoes.

## Output

For every testcase print a single line with the largest possible team size.

## Example

```Input
2
20 30 40
1000000000 2000000000 500000000
```

```Output
10
500000000
```

In the first testcase teams of $10$ work: $2$ teams of ants, $3$ of bees and $4$ of mosquitoes. No bigger size divides all three numbers.

## Constraints

$1 \le t \le 1000$
$1 \le a, b, c \le 2 \cdot 10^9$

---

*This problem was adapted, with permission, from [Najveći zajednički delilac](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/euklid), authored by Društvo matematičara Srbije and Fondacija Petlja.*
