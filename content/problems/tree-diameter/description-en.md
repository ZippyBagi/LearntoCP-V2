A national park has $n$ outposts joined by $n - 1$ trails. Every outpost can be reached from every other one, and between any two of them there is exactly one route - the trails form a tree.

The rangers want to know the worst case. Somewhere in the park there is a pair of outposts whose route is longer than any other, and they want to know how many trails that route uses. That number is the **diameter** of the tree.

Write a program that finds it.

## Input

First line of input will be a single integer $t$ - the number of testcases.
The first line of each testcase contains a single integer $n$ - the number of outposts.
Each of the next $n - 1$ lines contains two integers $u$ and $v$ - a trail joining outpost $u$ and outpost $v$, walkable in both directions.

Outposts are numbered $1$ to $n$. The trails always join all the outposts without closing a loop, so they form a tree.

## Output

For every testcase print a single line with the number of trails on the longest route in the park.

## Example

```Input
3
7
1 2
1 3
2 4
3 5
4 6
5 7
4
1 2
1 3
1 4
1
```

```Output
6
2
0
```

In the first testcase the longest route runs $6 \rightarrow 4 \rightarrow 2 \rightarrow 1 \rightarrow 3 \rightarrow 5 \rightarrow 7$ and uses $6$ trails. Notice that outpost $1$ is not on either end of it - from outpost $1$ nothing is more than $3$ trails away. In the second testcase every trail meets at outpost $1$, so any two of the others are $2$ trails apart. In the third there is a single outpost and nowhere to walk.

## Constraints

$1 \le t \le 100$
$1 \le n \le 10^5$
$1 \le u, v \le n$ and $u \ne v$
The sum of $n$ over all testcases does not exceed $10^5$
