An array $a$ of $n$ integers is given. A **segment** of the array is a group of consecutive elements. A segment is **increasing** if every element in it is strictly smaller than the one after it, and it has **at least two** elements. Your task is to count the increasing segments of the given array.

Formally, you are counting the pairs of positions $(p, q)$, $0 \le p < q < n$, for which $a_p < a_{p+1} < \ldots < a_q$.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains an integer $n$ - the number of elements.
- The next line contains $n$ integers $a_0, a_1, \ldots, a_{n-1}$ - the elements of the array.

## Output

For every testcase print a single line with the number of increasing segments.

## Example

```Input
2
5
1 3 4 -2 10
4
2 2 3 1
```

```Output
4
1
```

In the first testcase the increasing segments are $[1, 3]$, $[1, 3, 4]$, $[3, 4]$ and $[-2, 10]$. In the second testcase the only one is $[2, 3]$ - the pair of equal elements $[2, 2]$ does not count, the increase must be strict.

## Constraints

$1 \le t \le 1000$
$2 \le n \le 2 \cdot 10^5$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Broj rastućih segmenata](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_rastucih_segmenata), authored by Društvo matematičara Srbije and Fondacija Petlja.*
