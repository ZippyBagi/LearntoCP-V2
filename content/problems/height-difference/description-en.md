A class is choosing actors for the school play "Laurel and Hardy" - a comedy duo famous for their large difference in height. The heights of all $n$ students are known, and a duo looks right exactly when the difference in height of its two members is exactly $r$.

Your task is to count in how many ways two students can be picked so that their height difference is exactly $r$. Two students with equal heights are still two different students - pairs are counted by **who is in them**, not by their heights.

## Input

The first line contains a single integer $t$ - the number of testcases.

- The first line of each testcase contains two integers $n$ and $r$ - the number of students and the required height difference.
- The next line contains $n$ integers $a_0, a_1, \ldots, a_{n-1}$ - the heights of the students in millimeters. Heights can repeat.

## Output

For every testcase print a single line with the number of pairs of students whose height difference is exactly $r$.

## Example

```Input
2
5 2350
15745 18095 15745 16234 13395
4 1
7 7 8 9
```

```Output
4
3
```

In the first testcase the pairs are: the first and the second student, the first and the fifth, the second and the third, and the third and the fifth. In the second testcase both students of height $7$ pair with the one of height $8$, and the one of height $8$ pairs with the one of height $9$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 2 \cdot 10^5$
$1 \le a_i \le 10^9$
$1 \le r \le 10^9$
$n_1 + n_2 + \ldots + n_t \le 2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Razlika visina](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/razlika_visina1), authored by Društvo matematičara Srbije and Fondacija Petlja.*
