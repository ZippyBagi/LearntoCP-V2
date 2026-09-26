
## Approach

The order of the elements is exactly what we are allowed to ignore, so what is left is **how many times each value appears**. Two arrays are permutations of each other precisely when every value occurs the same number of times in both.

Counting occurrences is what a map is for, so build one map per array with `a[x]++` and `b[x]++`, and then simply compare them. Two maps are equal when they hold the same keys with the same values, which is exactly the condition above.

Note that we never have to compare the lengths. If the maps match, all the counts match, so the totals match too.

**Careful:** the values go up to $10^{18}$, which is far past what an `int` holds (about $2.1 \cdot 10^9$). The key type has to be `long long`, so the maps are `map<long long, int>` - only the keys are huge, the counts stay small.

Since we only compare the maps and never need the keys in order, `unordered_map` works here just as well.

## Example

| testcase | counts of the first array | counts of the second array | equal |
|----------|---------------------------|----------------------------|-------|
| $1$ | $\{1{:}1, \ 2{:}1, \ 3{:}2, \ 4{:}1\}$ | $\{1{:}1, \ 2{:}1, \ 3{:}2, \ 4{:}1\}$ | **YES** |
| $2$ | $\{5{:}1, \ 10^{18}{:}2\}$ | $\{5{:}2, \ 10^{18}{:}1\}$ | **NO** |

Both maps of the first testcase hold one $1$, one $2$, two $3$s and one $4$, in whatever order the arrays happened to list them. In the second testcase the same two keys appear, but with the counts swapped.

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

        map<long long, int> a; // how many times each value appears in the first array

        for(int i = 0; i < n; i++) {
            long long x;
            cin >> x;
            a[x]++;
        }

        int m;
        cin >> m;

        map<long long, int> b;

        for(int i = 0; i < m; i++) {
            long long x;
            cin >> x;
            b[x]++;
        }

        if(a == b) cout << "YES" << "\n";
        else cout << "NO" << "\n";
    }

    return 0;
}
```

## Complexity

Time $O((n + m) \log n)$
Memory $O(n + m)$
