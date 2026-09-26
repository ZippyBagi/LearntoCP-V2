A robber is planning to rob houses along a street. Each house has a certain amount of money stashed inside. The only thing stopping him from robbing all of them is that the houses have connected security systems: if two **adjacent** houses are robbed on the same night, the alarm will automatically go off.

Write a program that determines the largest amount of money the robber can steal without triggering the alarm. Formally, find the largest sum of a subsequence of the given sequence that does not contain two consecutive elements.

## Input

First line of input will be a single number $n$, the number of houses.
In the next line will be $n$ numbers $a_1, a_2, \dots, a_n$, the amount of money in each house.

## Output

A single number - the largest amount of money that can be stolen.

## Example

```Input
5
2 7 9 3 1
```

```Output
12
```

The robber robs the houses with $2$, $9$ and $1$ ($2 + 9 + 1 = 12$). No two of them are adjacent.

## Constraints

$1 \le n \le 2 \cdot 10^5$
$0 \le a_i \le 10^9$
