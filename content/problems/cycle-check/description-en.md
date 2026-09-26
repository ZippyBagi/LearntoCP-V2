In the future there will be many worlds, and inside each one people will be able to teleport from planet to planet. A teleporter is **one-way**: a link from planet $a$ to planet $b$ lets you travel from $a$ to $b$, but not back.

For each world, decide whether there is any planet you could leave and then return to by taking a series of teleports.

## Input

First line of input will be a single integer $t$ - the number of worlds.
The first line of each world contains two integers $v$ and $e$ - the number of planets and the number of teleporters.
Each of the next $e$ lines contains two integers $a$ and $b$ - a teleporter leading from planet $a$ to planet $b$.

Planets are numbered $0$ to $v-1$.

## Output

For every world print a single line: `yes` if some planet can be left and returned to, and `no` otherwise.

## Example

```Input
2
5 5
0 1
2 1
2 3
3 4
4 2
5 5
0 1
2 1
2 3
3 4
4 0
```

```Output
yes
no
```

In the first world you can leave planet $2$ and come back to it by teleporting $2 \rightarrow 3 \rightarrow 4 \rightarrow 2$. The second world uses almost the same links, but the last one leads to planet $0$ instead of planet $2$ - and planet $0$ has no teleporter arriving at it, so nothing can ever get back.

## Constraints

$1 \le t \le 20$
$2 \le v \le 5000$
$1 \le e \le 2 \cdot 10^4$
$0 \le a, b \le v-1$
The sum of $v$ over all worlds does not exceed $5 \cdot 10^4$, and the sum of $e$ does not exceed $2 \cdot 10^5$

---

*This problem was adapted, with permission, from [Provera ciklusa](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/provera_ciklusa), authored by Društvo matematičara Srbije and Fondacija Petlja.*
