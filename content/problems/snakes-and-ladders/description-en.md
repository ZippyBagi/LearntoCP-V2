In the game of Snakes and Ladders a player moves along a row of squares by throwing a die and stepping forward as many squares as it shows. Some squares are special:

- landing on a square with a **ladder** carries the player up to the higher square the ladder leads to;
- landing on a square with a **snake** slides him down to the lower square the snake leads to.

The square he is carried to may hold a snake or a ladder of its own, and then he is carried on again, and again, until he finally stops on a square that holds neither.

If following that chain ever returns to a square it has already passed, the player is caught in a loop, **instantly loses**, and can never reach the finish. Such squares have to be avoided.

Your task is to find the smallest number of throws needed to get from the starting square to the final square.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains three integers $n$, $k$ and $m$ - the number of squares, the largest number the die can show, and how many snakes and ladders there are together. The squares are numbered $0$ to $n-1$; the player starts on square $0$ and the final square is $n-1$. A throw gives any number from $1$ to $k$, and a throw that would carry the player **past** the final square is not allowed.
In the next $m$ lines will be two integers $u$ and $v$ - a snake or a ladder leading from square $u$ to square $v$. No square holds more than one of them, and neither the starting nor the final square holds any.

## Output

For every testcase print a single line with the smallest number of throws needed to reach the final square, or $-1$ if it cannot be reached.

## Example

```Input
2
18 2 5
2 12
3 13
8 17
11 1
14 7
5 2 2
1 3
3 1
```

```Output
3
2
```

In the first testcase, throwing $2$ takes the player from square $0$ to square $2$, where a ladder lifts him to $12$. Another $2$ lands him on $14$, where a snake drops him to $7$. A final $1$ lands him on $8$, and the ladder there carries him to square $17$ - the finish, in $3$ throws.

In the second testcase squares $1$ and $3$ point at each other, so landing on either of them loses the game at once. The player has to step over both: $0 \rightarrow 2 \rightarrow 4$, in $2$ throws.

## Constraints

$1 \le t \le 1000$
$2 \le n \le 2000$
$1 \le k \le n - 1$
$0 \le m \le n - 2$
$0 < u < n - 1$
$0 \le v \le n - 1$
$u \ne v$, and no value of $u$ is repeated
the sum of $n$ over all testcases does not exceed $2 \cdot 10^4$

---

*This problem was adapted, with permission, from [Zmije i lestve](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/zmije_i_lestve), authored by Društvo matematičara Srbije and Fondacija Petlja.*
