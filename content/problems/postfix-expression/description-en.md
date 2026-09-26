Postfix notation (also called reverse Polish notation, in honor of the Polish logician Jan Lukasiewicz who invented it) writes an operator **after** its two operands instead of between them. So instead of `3 + 5` we write `3 5 +`. The big advantage: postfix expressions need no brackets - the order of operations is never ambiguous.

Your task is to compute the value of postfix expressions built from **one-digit numbers** and the operators `+` and `*`, written with no spaces.

## Input

First line of input will be a single integer $t$ - the number of testcases.
Each of the next $t$ lines contains one valid postfix expression.

## Output

For every expression print a single line with its value.

## Example

```Input
2
12+3*
11+2*345+*+
```

```Output
9
31
```

The first expression is `(1+2)*3`. The second is `(1+1)*2+3*(4+5)`.

## Constraints

$1 \le t \le 1000$
Each expression has at most $199$ characters.
The value of the expression, and of every intermediate result, is at most $10^{18}$.

---

*This problem was adapted, with permission, from [Vrednost postfiksnog izraza](https://petlja.org/sr-Latn-RS/biblioteka/r/Zbirka2/vrednost_postfiksnog_izraza), authored by Društvo matematičara Srbije and Fondacija Petlja.*
