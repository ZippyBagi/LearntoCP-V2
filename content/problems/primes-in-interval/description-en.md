For each of $t$ intervals $[a, b]$, determine how many prime numbers it contains and what their sum is. Since the sum can be a large number, print only its remainder modulo $1000000$.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains two integers $a$ and $b$ - the ends of an interval.

## Output

For every testcase print a single line with two numbers separated by a space: the number of primes in $[a, b]$ and their sum modulo $1000000$.

## Example

```Input
1
1 1000
```

```Output
168 76127
```

There are $168$ primes up to $1000$ and their sum is $76127$.

## Constraints

$1 \le t \le 10^5$
$1 \le a \le b \le 10^6$

---

*This problem was adapted, with permission, from [Eratostenovo sito](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/eratostenovo_sito), authored by Društvo matematičara Srbije and Fondacija Petlja.*
