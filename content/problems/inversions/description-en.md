An **inversion** in an array is a pair of positions $i < j$ where the earlier element is the bigger one, that is $a_i > a_j$. A sorted array has no inversions at all, and an array sorted the wrong way round has as many as there are pairs - so the number of inversions is a measure of how far from sorted an array is.

Your task is to count them.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains a single integer $n$ - the length of the array.
The second line contains $n$ integers $a_1, a_2, \dots, a_n$.

## Output

For every testcase print a single line with the number of inversions in that array.

## Example

```Input
2
5
3 1 4 2 5
4
4 3 2 1
```

```Output
3
6
```

The first array has three inversions: the pairs $(3, 1)$, $(3, 2)$ and $(4, 2)$. The second one is sorted in reverse, so every one of its $6$ pairs is an inversion.

## Constraints

$1 \le t \le 10$
$1 \le n \le 10^5$
$-10^9 \le a_i \le 10^9$
The sum of $n$ over all testcases does not exceed $2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Broj inverzija](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/broj_inverzija), authored by Društvo matematičara Srbije and Fondacija Petlja.*
