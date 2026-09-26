Every code editor can instantly tell you whether the brackets in your program match up. Tonight, you are the editor.

Given a string made of the characters `(` and `)`, check if the brackets are **balanced** - every opening bracket is closed by exactly one closing bracket that comes after it, and every closing bracket closes exactly one opening bracket before it.

For example, `(()())` is balanced, while `(()` is not (an opener was never closed) and `)(` is not (a closer appeared before any opener).

## Input

First line of input will be a single string $s$, made only of the characters `(` and `)`.

## Output

Print `YES` if the brackets are balanced, and `NO` otherwise.

## Example

```Input
(()())
```

```Output
YES
```

The first bracket is closed by the last one, and the two pairs inside close each other.

## Constraints

$1 \le |s| \le 10^6$
