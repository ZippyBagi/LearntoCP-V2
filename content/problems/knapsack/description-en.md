A thief broke into a warehouse carrying a knapsack that can hold at most $W$ kilograms. In the warehouse there are $n$ items, each with a weight and a value. Every item can be taken **at most once**, and items cannot be split.

Determine the largest total value of items the thief can carry out, such that their total weight does not exceed $W$.

## Input

First line of input will be two numbers: $n$ and $W$, the number of items and the capacity of the knapsack.
In the next $n$ lines will be two numbers each: $w_i$ and $v_i$, the weight and the value of the $i$-th item.

## Output

A single number - the largest total value that fits in the knapsack.

## Example

```Input
4 5
4 1
5 2
1 3
3 4
```

```Output
7
```

The thief takes the third and the fourth item: total weight $1 + 3 = 4 \le 5$, total value $3 + 4 = 7$.

## Constraints

$1 \le n \le 100$
$1 \le W \le 10^4$
$1 \le w_i \le W$
$1 \le v_i \le 10^6$
