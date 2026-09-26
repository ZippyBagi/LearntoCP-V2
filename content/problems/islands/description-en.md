A satellite photographed a piece of ocean and split it into a grid of $n$ rows and $m$ columns. Every square came back as one of two things: `#` for land, or `.` for water.

An **island** is a group of land squares you can walk across without ever getting your feet wet, stepping only **up, down, left or right**. Two land squares that touch only at a corner belong to different islands - you cannot step diagonally.

Your task is to count the islands on the photo, and to measure the largest one.

## Input

First line of input will be a single integer $t$ - the number of testcases.
First line of each testcase contains two integers $n$ and $m$ - the number of rows and columns of the photo.
In the next $n$ lines will be $m$ characters each, either `#` or `.`, describing one row of the photo.

## Output

For every testcase print a single line with two integers - the number of islands on the photo, and the number of land squares of the largest island. If the photo is all water, print `0 0`.

## Example

```Input
1
4 6
#..##.
##..#.
....#.
.##..#
```

```Output
4 4
```

There are four islands. The largest is the one on the right of the top two rows, made of $4$ squares. Notice the single square in the bottom right corner: it touches the island above it **only at a corner**, so it is an island of its own.

## Constraints

$1 \le t \le 1000$
$1 \le n, m \le 200$
the sum of $n \cdot m$ over all testcases does not exceed $10^5$
