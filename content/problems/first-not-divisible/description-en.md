Consider the array $210, 2310, 390, 30, 510, 66, 6, 138, 46, 106, 59, 17, 23$. It is interesting for several reasons. The first five numbers are divisible by $10$, and after that no number is divisible by $10$. The first ten numbers are even, and after that all are odd. The first eight numbers are divisible by $6$, and after that none is. Arrays like this one have a special property: for certain divisors, the numbers divisible by the divisor come **first**, followed only by numbers that are not.

You are given such an array and $q$ divisors. For every divisor it is **guaranteed** (no need to check) that the elements divisible by it form a prefix of the array - your task is to determine, for each divisor, how many elements are divisible by it.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains two integers $n$ and $q$ - the number of elements and the number of divisors.
- The next line contains $n$ positive integers - the elements of the array.
- The next line contains $q$ positive integers - the divisors.

## Output

For every divisor print a single line with the number of elements divisible by it.

## Example

```Input
1
13 6
210 2310 390 30 510 66 6 138 46 106 59 17 23
10 2 6 2 4 15
```

```Output
5
10
8
10
0
5
```

The first five elements are divisible by $10$, the first ten by $2$, the first eight by $6$, none by $4$ and the first five by $15$.

## Constraints

$1 \le t \le 1000$
$1 \le n, q \le 2 \cdot 10^5$
$1 \le a_i < 10^{18}$
$1 \le d < 10^{18}$ for every divisor $d$
Both the sum of $n$ and the sum of $q$ over all testcases are at most $2 \cdot 10^5$.

---

*This problem was adapted, with permission, from [Prvi koji nije deljiv](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/prvi_paran1), authored by Društvo matematičara Srbije and Fondacija Petlja.*
