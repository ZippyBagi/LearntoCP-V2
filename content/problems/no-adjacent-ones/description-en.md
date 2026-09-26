A hotel corridor has $n$ rooms in a row. Every room is either empty or occupied, and the manager has one rule: two occupied rooms may never be next to each other.

Write down $0$ for an empty room and $1$ for an occupied one, and every allowed arrangement of the corridor becomes an array of $n$ digits in which no two $1$s stand side by side.

Print all of them.

The arrangements must come out in increasing order, reading each array as a number - so the all-empty corridor is first, and the arrangement starting with the most occupied rooms at the front is last.

## Input

The only line of input contains a single integer $n$ - the number of rooms.

## Output

Print every allowed arrangement on its own line, as $n$ digits separated by single spaces, in the order described above.

## Example

```Input
4
```

```Output
0 0 0 0
0 0 0 1
0 0 1 0
0 1 0 0
0 1 0 1
1 0 0 0
1 0 0 1
1 0 1 0
```

There are eight arrangements for $n = 4$. Arrays like `0 1 1 0` and `1 1 0 0` are missing because they put two occupied rooms next to each other.

## Constraints

$1 \le n \le 20$
