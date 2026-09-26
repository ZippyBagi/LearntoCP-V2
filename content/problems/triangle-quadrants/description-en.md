A town is laid out as a grid. Two main roads cross in the town centre, and on the map the centre is the origin, one road runs along the $x$ axis and the other along the $y$ axis.

The two roads cut the map into the four **quadrants**, numbered $1$ to $4$ counter-clockwise: quadrant $1$ is everything with $x > 0$ and $y > 0$, quadrant $2$ is $x < 0$ and $y > 0$, quadrant $3$ is $x < 0$ and $y < 0$, and quadrant $4$ is $x > 0$ and $y < 0$. A point that lies on a road belongs to no quadrant at all.

A triangle is drawn on the map. Your task is to determine, for each of the four quadrants, whether the triangle has an **interior point** in it - a point strictly inside the triangle, not one lying on a side or in a corner.

## Input

The first line contains a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains six integers $x_1$, $y_1$, $x_2$, $y_2$, $x_3$, $y_3$ - the three vertices of the triangle. The three vertices are never on one straight line, so the triangle always has positive area.

## Output

For every testcase print a single line of four characters. The $k$-th character is `+` if the triangle has an interior point in quadrant $k$, and `-` if it does not.

## Example

```Input
4
1 2 2 5 5 -10
-1 -1 1 5 5 1
-10 20 -5 15 -10 15
0 0 -3 1 1 -3
```

```Output
+--+
++++
-+--
-+++
```

The first triangle lies entirely in $x \ge 0$, so quadrants $2$ and $3$ are out, and it reaches from $y = 5$ down to $y = -10$, so it has interior points on both sides of the $x$ axis. The third triangle lies entirely in $x \le 0$ and entirely in $y \ge 0$, so only quadrant $2$ is possible. The fourth triangle has a vertex exactly at the origin and reaches into three quadrants, but **not** quadrant $1$ - it has interior points with $x < 0$ and interior points with $y < 0$, and none with both $x > 0$ and $y > 0$.

## Constraints

$1 \le t \le 10^4$
$-10^6 \le x_i, y_i \le 10^6$

---

*This problem was adapted, with permission, from [U kojim kvadrantima je trougao](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/u_kojim_kvadrantima_je_trougao), authored by Društvo matematičara Srbije and Fondacija Petlja.*
