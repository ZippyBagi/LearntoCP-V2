Students numbered $0$ to $n-1$ sit in a circle and play a counting-out game. The counting starts from student $0$ and goes around the circle; every $m$-th student is out of the game, and the counting continues from the next one. Your task is to determine which student remains last.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains two integers $n$ and $m$ - the number of students and the length of the count.

## Output

For every testcase print a single line with the number of the last remaining student.

## Example

```Input
2
8 3
2 2
```

```Output
6
0
```

In the first testcase the students leave in the order $2, 5, 0, 4, 1, 7, 3$ and student $6$ remains. In the second, counting $0, 1$ eliminates student $1$, so student $0$ remains.

## Constraints

$1 \le t \le 100$
$2 \le n \le 5000$
$2 \le m \le n$
$n_1 + n_2 + \ldots + n_t \le 5000$

---

*This problem was adapted, with permission, from [Josifov problem](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/josifov_problem), authored by Društvo matematičara Srbije and Fondacija Petlja.*
