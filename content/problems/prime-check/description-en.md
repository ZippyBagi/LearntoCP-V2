A number is **prime** if it is greater than $1$ and has no divisors other than $1$ and itself. Your task is to check, for each given number, whether it is prime.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains a single integer $n$.

## Output

For every testcase print `YES` if $n$ is prime, and `NO` otherwise.

## Example

```Input
2
17
903543481
```

```Output
YES
NO
```

$17$ has no divisors other than $1$ and $17$. The second number looks like a prime for a very long time, but $903543481 = 30059 \cdot 30059$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 10^9$

---

*This problem was adapted, with permission, from [Prost broj](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/prost_broj), authored by Društvo matematičara Srbije and Fondacija Petlja.*
