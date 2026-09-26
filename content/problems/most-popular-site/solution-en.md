
## Approach

A link $u \rightarrow v$ is one link out of $u$ and one link into $v$, and nothing else in the input touches those two counts. So one array is enough:

$$popularity[v] = (\text{links into } v) - (\text{links out of } v)$$

Reading a link means two updates, `popularity[v]++` and `popularity[u]--`. Then walk the sites from $1$ to $n$ and keep the best, comparing with a **strict** `>`. We are walking in increasing order, so a later site that only ties never replaces the current best and the smallest number wins on its own.
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

        int n, m;
        cin >> n >> m;

        vector<int> pop(n+1, 0); // pop[v] = links into v minus links out of v

        for(int i=0;i<m;i++) {

            int u, v;
            cin >> u >> v;

            if(u == v) continue; // a link from a site to itself is ignored

            pop[v]++; // one more link leading in
            pop[u]--; // one more link leading out
        }

        int best = 1;

        for(int v=2;v<=n;v++) {
            if(pop[v] > pop[best]) best = v; // strict >, so a tie keeps the smaller number
        }

        cout << best << " " << pop[best] << "\n";
    }

    return 0;
}
```

## Complexity

Time $O(n + m)$
Memory $O(n)$
