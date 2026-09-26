Competitive programmers have a rating, expressed as an integer (possibly negative). A school wants to send three-member teams to the national team contest, and the organizers ask that every team is balanced: the **total rating of each team must be zero**. Given the ratings of all competitors from one school, your task is to determine in how many ways the school can pick its team.

Formally, you are counting the ways to choose **three different competitors** whose ratings sum to $0$.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains an integer $n$ - the number of competitors.
- The next line contains $n$ pairwise different integers $a_0, a_1, \ldots, a_{n-1}$ - their ratings.

## Output

For every testcase print a single line with the number of possible teams whose total rating is zero.

## Example

```Input
1
9
-8 -5 7 4 1 -2 9 -3 2
```

```Output
4
```

The teams are $(-8, 1, 7)$, $(-5, 4, 1)$, $(-3, 1, 2)$ and $(-5, -2, 7)$.

## Constraints

$1 \le t \le 100$
$3 \le n \le 5000$
$-10^9 \le a_i \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 5000$

---

*This problem was adapted, with permission, from [Trojke datog zbira (3sum)](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/three_sum1), authored by Društvo matematičara Srbije and Fondacija Petlja.*
