In the game "Minesweeper", there are hidden bombs on the field and the player's task is to find them. The player is shown a board with numbers where each number represents the amount of bombs that are surrounding that field (surrounding fields are viewed in all 8 directions). Your task is to start programming this game by writing a program that determines these numbers for a given arrangement of bombs.

## Input

First line of input will be two numbers: $m$ and $n$, the dimensions of the field.
In the next $m$ lines will be $n$ numbers, that are either 1 (there is a bomb), or 0 (there isn't a bomb).

## Output

A matrix sized $m$ X $n$, where each field represents the number of bombs surrounding it

## Example

```Input
3 4
0 1 0 1
1 0 1 0
0 1 0 0
```

```Output
2 2 3 1
2 4 3 2
2 2 2 1
```

## Constraints

$3 \le m, n \le 100$