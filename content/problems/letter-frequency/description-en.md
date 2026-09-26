A dictionary app wants to show statistics for every word: which letters it contains, and how many times each one appears.

Given a word, print the count of every letter that appears in it, in **alphabetical order**.

## Input

First line of input will be a single word $s$, made only of lowercase English letters.

## Output

For every letter that appears in $s$, in alphabetical order, print one line in the format `letter: count`.

## Example

```Input
banana
```

```Output
a: 3
b: 1
n: 2
```

The word contains three `a`'s, one `b` and two `n`'s - printed in alphabetical order. Letters that never appear are not printed.

## Constraints

$1 \le |s| \le 10^6$
