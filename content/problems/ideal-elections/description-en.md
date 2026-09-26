Elections for the title of "Best Number" are being held in Saransk. There are $n$ people at the polling station, and the $i$-th of them carries a number $a_i$.

When a person steps into the booth, they do not vote for their own number - they vote for a candidate that is a **divisor** of it. So the $i$-th person picks some $p_i$ that divides $a_i$ (this can be $1$, or $a_i$ itself, or anything in between).

After everyone has voted we are left with an array of votes $[p_1, p_2, \ldots, p_n]$. The organizer calls the vote **ideal** when the least common multiple of all the votes equals their product:

$$lcm(p_1, p_2, \ldots, p_n) = p_1 \cdot p_2 \cdot \ldots \cdot p_n$$

Here $lcm$ is the **least common multiple** - the smallest number divisible by every $p_i$.

Count how many different ideal arrays of votes are possible. Two arrays are different if they differ in **at least one** position. The count can be enormous, so print it modulo $10^9 + 7$.

## Input

The first line contains the number of test cases $t$.

Each test case takes two lines. The first line has a single integer $n$ - the number of voters. The second line has $n$ integers $a_1, a_2, \ldots, a_n$ - the numbers they carry.

The sum of $n$ over all test cases does not exceed $10^5$.

## Output

For each test case print one line: the number of ideal vote arrays, modulo $10^9 + 7$.

## Example

```Input
4
4
2 3 1 4
2
2 4
6
3 9 1 6 4 5
7
1 2 3 67 13 8 8
```

```Output
8
4
40
64
```

In the first test we have $8$ valid arrays - for example everyone voting $1$, or the fourth person voting $4$ while the rest vote $1$, etc..

## Constraints

$1 \le t \le 10^4$
$1 \le n \le 10^5$
$1 \le a_i \le 5 \cdot 10^5$
The sum of $n$ over all test cases does not exceed $10^5$.

---

This problem was adapted from [Elections in Saransk (easy version)](https://codeforces.com/contest/2236/problem/F1), problem F1 of Codeforces Round 1103 (Div. 3).
