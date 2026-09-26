If a few prime numbers are given, their product is easy to compute. The reverse direction is much harder: given the product, find the primes that make it up. Your task is to print the prime factorization of each given number.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains a single integer $n$.

## Output

For every testcase print a single line with the prime factors of $n$ in **increasing order**, separated by single spaces. Every prime appears as many times as it divides $n$.

## Example

```Input
2
900
97
```

```Output
2 2 3 3 5 5
97
```

$900 = 2 \cdot 2 \cdot 3 \cdot 3 \cdot 5 \cdot 5$, and $97$ is prime, so it is its own entire factorization.

## Constraints

$1 \le t \le 100$
$2 \le n \le 2 \cdot 10^9$

---

*This problem was adapted, with permission, from [Rastavljanje na proste činioce](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/rastavljanje_na_proste_cinioce), authored by Društvo matematičara Srbije and Fondacija Petlja.*
