There are three pegs, numbered $1$, $2$ and $3$. On the first one sit $n$ discs of different sizes, stacked by size: the disc of size $n$ is at the bottom, the disc of size $n-1$ on top of it, and so on up to the disc of size $1$ at the very top. The other two pegs are empty.

Your task is to move the whole stack from peg $1$ to peg $3$ in as **few moves** as possible. There are two rules:

- one move takes the **top** disc of some peg and puts it on the top of another peg;
- a disc may never be placed on a **smaller** disc.

Write a program that prints the moves.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains a single integer $n$ - the number of discs on the first peg.

## Output

For every testcase print one line per move: the number of the peg the disc is taken from and the number of the peg it is put on, separated by a single space. The moves of the testcases follow one another with nothing in between.

## Example

```Input
2
3
2
```

```Output
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
1 3
2 3
```

The first seven lines solve $n = 3$: the smallest disc goes to peg $3$, the middle one to peg $2$, then the smallest joins it, which frees the biggest disc to move to peg $3$ - and the two discs waiting on peg $2$ follow it in three more moves. The last three lines solve $n = 2$.

## Constraints

$1 \le t \le 8$
$1 \le n \le 16$

---

*This problem was adapted, with permission, from [Hanojske kule](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/hanojske_kule), authored by Društvo matematičara Srbije and Fondacija Petlja.*
