
## Approach

Fewest throws on a board where every throw costs the same is a shortest path counted in edges, so it is BFS. But before any search can start, we have to know where a throw actually leaves you.

Landing on square $x$ is not the end of the move: a snake or a ladder carries the player on, and possibly carries him again. Define

$$land[x] = \text{the square the player finally comes to rest on after landing on } x$$

Every square points at **at most one** other, so following the chain from $x$ is a single walk with no choices to make. It ends in one of two ways: on a square holding nothing, or back on a square it has already passed, looping forever. The second case is the losing one, marked $land[x] = -1$.

### Finding the loops

Three states answer "have we come back on ourselves", in place of a `visited` flag:

- $0$ - never looked at
- $1$ - on the chain being resolved right now
- $2$ - finished, $land$ is known

~!
```c++
if(state[v] == 2) return land[v]; // already known
if(state[v] == 1) return -1;      // we walked back into v, so v sits on a cycle
```

Each square is resolved once and reused after that, so the pass costs $O(n)$. A square that merely leads into a loop without being on it also comes out $-1$, because the call it is waiting on returns $-1$ - which is right, since the player who lands there is carried into the loop just the same.

### The search

Now it is the BFS from the Shortest Paths lesson, where the moves from $v$ are the rolls $1 \dots k$ and each arrives at $land[v + roll]$ rather than at $v + roll$:

~!
```c++
if(v + roll > n - 1) break;   // a throw past the last square is not allowed
int to = land[v + roll];
if(to == -1) continue;        // that square loses the game, so we never step on it
```

`break` rather than `continue`, because the throws only get bigger.

**Careful:** the distance belongs to the square the player **ends up** on, never to the one the die showed. Squares carrying a snake or a ladder are doorways, not places, and giving them a distance counts the ladder itself as a throw.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int resolve(int v, vector<int>& jump, vector<int>& state, vector<int>& land) {

    if(state[v] == 2) return land[v]; // already known
    if(state[v] == 1) return -1;      // we walked back into v, so v sits on a cycle

    state[v] = 1;

    if(jump[v] == -1) land[v] = v;                      // nothing here, the player stays
    else land[v] = resolve(jump[v], jump, state, land); // he is carried on, wherever that ends up

    state[v] = 2;
    return land[v];
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, k, m;
        cin >> n >> k >> m;

        vector<int> jump(n, -1); // jump[v] is where a snake or ladder on v leads, or -1
        vector<int> state(n, 0); // 0 = untouched, 1 = being resolved right now, 2 = finished
        vector<int> land(n, -1); // land[v] is where the player really ends up, or -1 if v is fatal

        for(int i=0;i<m;i++) {

            int u, v;
            cin >> u >> v;

            jump[u] = v;
        }

        for(int v=0;v<n;v++) resolve(v, jump, state, land);

        vector<int> dist(n, -1); // dist[v] = fewest throws needed to stand on v

        queue<int> q;

        dist[0] = 0;
        q.push(0);

        while(!q.empty()) {

            int v = q.front();
            q.pop();

            for(int roll=1;roll<=k;roll++) {

                if(v + roll > n - 1) break; // a throw past the last square is not allowed

                int to = land[v + roll];

                if(to == -1) continue; // that square loses the game, so we never step on it

                if(dist[to] == -1) { // first time we see it, so this is the fewest throws
                    dist[to] = dist[v] + 1;
                    q.push(to);
                }
            }
        }

        cout << dist[n-1] << "\n"; // -1 already means "cannot be done"
    }

    return 0;
}
```

## Complexity

Time $O(n \cdot k)$
Memory $O(n)$
