Given an array of numbers, find the longest subsequence (the elements don't have to be next to each other) such that the numbers are **strictly increasing**.

Since there can be multiple such subsequences of the same (longest) length, print the **lexicographically smallest** one.

A sequence $x$ is lexicographically smaller than a sequence $y$ of the same length if, at the first position where they differ, $x$ has the smaller element.

## Input

First line of input will be a single number $n$, the length of the array.
In the next line will be $n$ numbers $a_1, a_2, \dots, a_n$.

## Output

In the first line, a single number $k$ - the length of the longest strictly increasing subsequence.
In the second line, $k$ numbers - the lexicographically smallest longest strictly increasing subsequence.

## Example

```Input
8
3 6 1 2 8 2 4 5
```

```Output
4
1 2 4 5
```

The longest strictly increasing subsequence has 4 elements, and the only one of that length is $1, 2, 4, 5$.

## Constraints

$1 \le n \le 1000$
$1 \le a_i \le 10^9$
