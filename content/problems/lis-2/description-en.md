Given an array of numbers, find the length of the longest subsequence (the elements don't have to be next to each other) such that the numbers are **strictly increasing**.

This is the same task as [Longest Increasing Subsequence](/en/Problems/lis), except only the length is required - but the array is much bigger, so the $O(n^2)$ solution will not be fast enough.

## Input

First line of input will be a single number $n$, the length of the array.
In the next line will be $n$ numbers $a_1, a_2, \dots, a_n$.

## Output

A single number - the length of the longest strictly increasing subsequence.

## Example

```Input
8
3 6 1 2 8 2 4 5
```

```Output
4
```

The longest strictly increasing subsequence is $1, 2, 4, 5$, with a length of 4.

## Constraints

$1 \le n \le 10^5$
$1 \le a_i \le 10^9$
