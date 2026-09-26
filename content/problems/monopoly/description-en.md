Monopoly is a game in which players move over fields arranged in a **circle**, always in the clockwise direction. The fields are numbered $0$ to $n-1$, both players start the game on field $0$ and never move backwards. If we know the total number of fields each player has traveled since the start of the game, we also know where each of them stands right now.

Your task is to compute how many steps **forward** the first player has to make to land on the field where the second player is standing.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains three integers $n$, $a$ and $b$ - the number of fields on the board, the total number of fields the first player has traveled, and the total number of fields the second player has traveled since the start of the game.

## Output

For every testcase print a single line with the number of steps forward the first player has to make to reach the field the second player is standing on.

## Example

```Input
2
10 3 7
10 7 3
```

```Output
4
6
```

In the first testcase the players stand on fields $3$ and $7$, so $4$ steps are enough. In the second the first player stands on field $7$ and the second on field $3$ - moving forward he passes fields $8, 9, 0, 1, 2$ and lands on $3$, which is $6$ steps.

## Constraints

$1 \le t \le 10$
$1 \le n \le 10^9$
$0 \le a, b \le 10^9$

---

*This problem was adapted, with permission, from [Monopol](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka3/monopol), authored by Društvo matematičara Srbije and Fondacija Petlja.*
