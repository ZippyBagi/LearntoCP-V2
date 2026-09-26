
## Approach

$n$ halls, $n - 1$ corridors, all of them reachable, no way to walk in a circle - the constraints spell out a **tree**. So there is exactly one route from the entrance to any hall, every hall has a single fixed altitude, and the answer is the smallest of them.

One DFS finds all of them. Every corridor is written pointing away from the entrance, so `adj[u]` holds exactly the halls one step deeper than $u$ and the search only ever goes further in. Carry the altitude down as a parameter, each step adding the corridor's difference:

$$altitude(\text{child}) = altitude(\text{parent}) + d$$

and keep a running minimum of every altitude the search stands on.

The solution is: `min(h,lowest)`

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

void dfs(int v, int altitude, vector<vector<int>>& adj, vector<vector<int>>& diff, int& lowest) {

    lowest = min(lowest, altitude); // this hall may be the deepest one

    for(int i=0;i<adj[v].size();i++) {
        dfs(adj[v][i], altitude + diff[v][i], adj, diff, lowest);
    }
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int h, n;
        cin >> h >> n;

        vector<vector<int>> adj(n+1);  // adj[v] holds the halls the corridors from v lead to
        vector<vector<int>> diff(n+1); // diff[v][i] is the altitude change on that corridor

        for(int i=0;i<n-1;i++) {

            int u, v, d;
            cin >> u >> v >> d;

            adj[u].push_back(v); // the corridor always leads away from the entrance
            diff[u].push_back(d);
        }

        int lowest = h; // the entrance hall is hall 1, and it sits at altitude h

        dfs(1, h, adj, diff, lowest);

        cout << lowest << "\n";
    }

    return 0;
}
```

`adj[v][i]` and `diff[v][i]` are read together - the $i$-th corridor out of $v$ and the step it costs - so the two vectors must always be pushed to in the same breath. And there is no `visited` array: every corridor leads deeper, so there is no way back to guard against.

## Complexity

Time $O(n)$
Memory $O(n)$
