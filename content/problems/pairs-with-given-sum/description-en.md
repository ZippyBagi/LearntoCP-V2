A number $s$ and an array of $n$  **different** non-negative integers are given. Your task is to count the pairs of elements of the array whose sum is exactly $s$.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains two integers $n$ and $s$ - the number of elements and the target sum.
- The next line contains $n$ different integers $a_0, a_1, \ldots, a_{n-1}$ - the elements of the array.

## Output

For every testcase print a single line with the number of pairs of different elements whose sum equals $s$.

## Example

```Input
2
6 7
2 5 4 7 0 6
5 8
1 2 3 4 6
```

```Output
2
1
```

In the first testcase the pairs are $(2, 5)$ and $(7, 0)$. In the second testcase the only pair is $(2, 6)$ - note that $4$ cannot be paired with itself.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$0 \le a_i \le 10^9$
$0 \le s \le 2 \cdot 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Broj parova datog zbira](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_parova_datog_zbira2), authored by Društvo matematičara Srbije and Fondacija Petlja.*
