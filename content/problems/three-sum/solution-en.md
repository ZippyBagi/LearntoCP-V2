
## Approach

Trying all triples takes $O(n^3)$ - about $2 \cdot 10^{10}$ checks for $n = 5000$, far too slow. Let's reuse what we know about pairs.

First **sort** the array. Now fix the **smallest member** of the team, the element $a_i$. The other two members:

- must come from the part of the array **to the right of $i$**;
- must sum to exactly $-a_i$.

That inner task is counting pairs with a given sum in a sorted array - the classic two pointers scan: `left` starts just right of $i$, `right` at the end, and the sum $a_i + a_{left} + a_{right}$ tells us which pointer to move.

On a match we can count the pair and move **both** pointers, because the ratings are **pairwise different**: once $a_{left}$ is part of a found pair, its only possible partner is $-a_i - a_{left}$, so no other pair through $a_{left}$ exists - same for $a_{right}$.

Every team is counted exactly once, at the index $i$ of its smallest member. The scan for one $i$ costs $O(n)$, so the whole count is $O(n^2)$ - about $2.5 \cdot 10^7$ steps, comfortably fast.

**Careful:** three ratings can add up to $3 \cdot 10^9$ in absolute value, which does not fit in an `int`. Store the ratings in `long long` (or cast before adding).

## Example

The example sorted: $[-8, -5, -3, -2, 1, 2, 4, 7, 9]$. For each fixed smallest member $a_i$ the two pointers find:

| $a_i$ | pairs found to its right | teams |
|---|---|---|
| $-8$ | $(1, 7)$ | $1$ |
| $-5$ | $(-2, 7)$, $(1, 4)$ | $2$ |
| $-3$ | $(1, 2)$ | $1$ |
| $-2, 1, 2, 4, 7, 9$ | none | $0$ |

Check the row of $-5$: the pointers scan $[-3, -2, 1, 2, 4, 7, 9]$ for the sum $5$ and hit $-2 + 7$ and $1 + 4$. In total $1 + 2 + 1 = 4$ teams - the answer.

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

        vector<long long> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        sort(a.begin(), a.end());

        long long cnt = 0;

        for(int i = 0; i < n; i++) {

            // count pairs to the right of i whose sum is -a[i]
            int left = i + 1, right = n - 1;

            while(left < right) {
                long long sum = a[i] + a[left] + a[right]; // up to 3 * 10^9, does not fit in an int
                if(sum == 0) {
                    cnt++;
                    left++;
                    right--;
                } else if(sum < 0) left++;
                else right--;
            }
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Complexity

Time $O(n^2)$
Memory $O(n)$
