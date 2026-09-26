An array $a$ of $n$ integers is given. A **segment** of the array is a group of consecutive elements with **at least one** element. Your task is to find the largest possible sum of a segment of the given array.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains an integer $n$ - the number of elements.
- The next line contains $n$ integers $a_0, a_1, \ldots, a_{n-1}$ - the elements of the array.

## Output

For every testcase print a single line with the largest sum of a segment.

## Example

```Input
2
6
2 -3 4 -1 3 -2
3
-5 -2 -8
```

```Output
6
-2
```

In the first testcase the best segment is $[4, -1, 3]$ with sum $6$. In the second testcase every element is negative, so the best segment is the single element $[-2]$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Maksimalni zbir segmenta](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/maksimalni_zbir_segmenta), authored by Društvo matematičara Srbije and Fondacija Petlja.*
