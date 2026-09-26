A team of cavers is standing in the entrance hall of a cave, on the ground, whose altitude above sea level is known.

The cave has $n$ halls, numbered $1$ to $n$, and the entrance hall is hall $1$. They are joined by $n - 1$ corridors, which connect all the halls without ever letting you walk in a circle. For every corridor we know the two halls it joins and the height difference between them.

Your task is to find the lowest altitude the cavers can descend to inside the cave.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains two integers $h$ and $n$ - the altitude of the ground in the entrance hall, and the number of halls.
In the next $n - 1$ lines will be three integers $u$, $v$ and $d$ describing one corridor: the hall it starts from, the hall it leads to, and the height difference between them. Every corridor is written pointing **away from the entrance**, so $u$ is always the hall closer to the entrance. A **negative** $d$ means the hall it leads to is **lower** than the one it starts from.

## Output

For every testcase print a single line with the lowest altitude the cavers can reach.

## Example

```Input
1
278 7
1 2 -20
1 3 -10
2 4 -5
2 5 10
3 6 -33
3 7 7
```

```Output
235
```

The deepest point is hall $6$. Getting there means walking from hall $1$ down to hall $3$, which costs $10$ metres, and then down again to hall $6$ for another $33$: $278 - 10 - 33 = 235$.

## Constraints

$1 \le t \le 1000$
$1 \le n \le 5 \cdot 10^4$
$|h| \le 10^4$
$1 \le u, v \le n$
$|d| \le 10^3$
the $n - 1$ corridors reach every hall, and there is no way to walk in a circle
the sum of $n$ over all testcases does not exceed $10^5$

---

*This problem was adapted, with permission, from [Pećine](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/pecine), authored by Društvo matematičara Srbije and Fondacija Petlja.*
