
## Approach

Checking all pairs is $O(n^2)$ - too slow. **Sort** the heights; the pairs do not change, because a pair is decided only by the two values in it.

Now walk through the sorted heights and ask at every student: **how many pairs does this student close?** A student of height $a_j$ pairs with everyone of height exactly $a_j - r$ - and in a sorted array all of them sit **next to each other**, in one block.

Keep a pointer at each end of that block:

- `low` - the first element that is not too small (at least $a_j - r$);
- `high` - the first element that is too big (more than $a_j - r$).

Everything between them is exactly $a_j - r$, so student $j$ adds `high - low` pairs.

As $j$ moves right, the height we are looking for only grows - so both pointers only ever move forward, and the whole scan is a single pass, the same argument as in [Pairs With a Given Sum](/en/Problems/pairs-with-given-sum).

Repeated heights need no special care: if three students have height $a_j - r$, the block has width $3$ and all three pairs are counted. And since $r \ge 1$, the block lies strictly left of $j$, so nobody is paired with themselves.

**Careful:** the answer explodes with duplicates: $10^5$ students of one height and $10^5$ of a height exactly $r$ above gives $10^{10}$ pairs - keep the counter in a `long long`.

## Example

The first testcase sorted: $[13395, 15745, 15745, 16234, 18095]$, $r = 2350$:

| $a_j$ | looking for | block $[low, high)$ | pairs added |
|---|---|---|---|
| $13395$ | $11045$ | empty | $0$ |
| $15745$ | $13395$ | $[0, 1)$ | $1$ |
| $15745$ | $13395$ | $[0, 1)$ | $1$ |
| $16234$ | $13884$ | empty | $0$ |
| $18095$ | $15745$ | $[1, 3)$ | **$2$** |

Check the last row: $18095$ needs a partner of height $15745$, and there are **two** students of that height - positions $1$ and $2$ - so it adds two pairs. Total: $1 + 1 + 2 = 4$ - the answer.

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
        long long r;
        cin >> n >> r;

        vector<long long> a(n);
        for(int i = 0; i < n; i++) cin >> a[i];

        sort(a.begin(), a.end());

        long long cnt = 0;
        int low = 0, high = 0; // both pointers only ever move forward

        for(int i = 0; i < n; i++) {
            while(a[low] < a[i] - r) low++;    // first element >= a[i] - r
            while(a[high] <= a[i] - r) high++; // first element > a[i] - r
            cnt += high - low;                 // elements equal to exactly a[i] - r
        }

        cout << cnt << "\n";
    }

    return 0;
}
```

## Complexity

Time $O(n \log n)$
Memory $O(n)$
