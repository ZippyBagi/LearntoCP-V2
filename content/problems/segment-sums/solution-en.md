
## Approach

Summing the period day by day costs $O(n)$ per question, so $m$ questions cost $O(n \cdot m)$ - up to $4 \cdot 10^{10}$ additions. We need each answer in constant time, and that is exactly what prefix sums give.

Let $pref_i$ be the total earnings of the **first $i$ days** (so $pref_0 = 0$ and $pref_n$ is everything). The prefix sums are built in one pass while reading: $pref_{i+1} = pref_i + a_i$.

The earnings from day $a$ to day $b$ are the earnings of the first $b + 1$ days with the first $a$ days removed:

$$pref_{b+1} - pref_a$$

One subtraction per question, no matter how long the period is.

**Careful:** the indices are shifted by one - $pref_{b+1}$, not $pref_b$ - because day $b$ must be **included**. Check it on a one-day period: for $a = b = 2$ the formula gives $pref_3 - pref_2$, exactly day $2$.

**Careful:** the total can reach $2 \cdot 10^5 \cdot 10^9 = 2 \cdot 10^{14}$, which does not fit in an `int` - keep the prefix sums in `long long`.

## Example

The array $[1, 2, 3, 4, 5]$ gives the prefix sums:

| $i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $pref_i$ | $0$ | $1$ | $3$ | $6$ | $10$ | $15$ |

The three questions: $(0, 4)$ gives $pref_5 - pref_0 = 15 - 0 = 15$, $(1, 3)$ gives $pref_4 - pref_1 = 10 - 1 = 9$, and $(2, 2)$ gives $pref_3 - pref_2 = 6 - 3 = 3$ - all three answers from the statement.

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

        int n;
        cin >> n;

        vector<long long> pref(n + 1, 0); // pref[i] = sum of the first i elements

        for(int i = 0; i < n; i++) {
            long long x;
            cin >> x;
            pref[i + 1] = pref[i] + x;
        }

        int m;
        cin >> m;

        while(m--) {
            int a, b;
            cin >> a >> b;
            cout << pref[b + 1] - pref[a] << "\n"; // sum of elements a..b
        }
    }

    return 0;
}
```

## Complexity

Time $O(n + m)$
Memory $O(n)$
