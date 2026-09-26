
## Approach

The board is a **circle** of $n$ fields, so a player who traveled $a$ fields stands on field $a \bmod n$ - every full lap of $n$ fields brings him back to where he was, only the **remainder** matters. This is exactly the pattern from the modulo lesson: positions repeat $0, 1, \dots, n-1, 0, 1, \dots$

So first replace $a$ and $b$ by the actual positions: `a = a % n` and `b = b % n`. Now both are fields between $0$ and $n-1$, and there are only two cases:

- if $b \ge a$, the second player is ahead on the same lap, so the answer is $b - a$;
- if $b < a$, the first player must go past field $0$: $n - a$ steps to reach $0$, then $b$ more, so the answer is $n - a + b$.

**Careful:** the first case must use $\ge$, not $>$. When both players stand on the same field ($b = a$) the answer is $0$ steps - the second branch would wrongly send the first player on a full lap of $n$ steps.

## Example

| $n$ | $a$ | $b$ | $a \ \% \ n$ | $b \ \% \ n$ | case | answer |
|-----|-----|-----|--------------|--------------|------|--------|
| $10$ | $3$ | $7$ | $3$ | $7$ | $b \ge a$ | $7 - 3 = $ **$4$** |
| $10$ | $7$ | $3$ | $7$ | $3$ | $b < a$ | $10 - 7 + 3 = $ **$6$** |

The first row is the easy case: field $7$ is ahead of field $3$. The second row wraps around: $3$ steps from field $7$ to field $0$, then $3$ more - moving forward $6$ fields from field $7$ really ends on field $3$.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, a, b;
        cin >> n >> a >> b;

        a = a % n; // position of the first player
        b = b % n; // position of the second player

        if(b >= a) cout << b - a << "\n";
        else cout << n - a + b << "\n"; // wrap past field 0
    }

    return 0;
}
```

## Complexity

Time $O(t)$
Memory $O(1)$
