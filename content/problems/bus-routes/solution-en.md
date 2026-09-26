
## Approach

Fewest of something, every step the same cost, a graph - that is BFS. The only question is which graph.

The natural one is wrong to build: stops as vertices, joined when some line holds both. A line with $m$ stops makes **every pair** of them neighbours,

$$m = 60000 \implies m(m-1) \approx 3.6 \cdot 10^9 \text{ edges}$$

from a single line that took $60000$ numbers to describe.

### Ride the line instead of storing it

Standing on stop $v$, BFS wants every stop that shares a line with $v$ - and that list is already in the input, it is the line itself. So keep `route[i]`, the stops of line $i$, and `lines[v]`, the lines stopping at $v$, both filled while reading. Expanding $v$ means walking the stops of each line through $v$.

One flag makes that fast. **Riding a line reaches every stop on it at once**, all at the same cost, so a second visit to the same line can only offer stops that already have a distance:

~!
```c++
if(used[line]) continue; // every stop of this line is already reached
used[line] = true;
```

Now each line is walked once and the whole search costs the size of the input.

**Careful:** mark `used[line]` when you first ride the line, not when you finish with it - the same reason the lesson marks a vertex when you push it.

The rest is the BFS from the Shortest Paths lesson. `dist[a] = 0`, `-1` means not reached yet, and `dist[b]` is already $-1$ when the final stop is unreachable, which is exactly what we have to print.

## Example

| stop leaving the queue | rides to it | lines through it | new stops it opens |
|---|---|---|---|
| $1$ | $0$ | the first line | $2$, $7$ |
| $2$ | $1$ | the first line (already ridden) | - |
| $7$ | $1$ | the first line (already ridden), the second line | $3$, $6$ |
| $3$ | $2$ | the second line (already ridden) | - |
| $6$ | $2$ | the second line (already ridden) | - |

The first row is one whole ride: boarding at stop $1$ opens $2$ and $7$ together, because reaching either is the same single ride. Stop $2$ then does nothing at all - its only line has been ridden - which is the flag earning its keep. Stop $7$ is where the change happens, opening $3$ and $6$ at $2$ rides.

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

        int s, n;
        cin >> s >> n;

        vector<vector<int>> route(n);   // route[i] lists the stops of line i
        vector<vector<int>> lines(s+1); // lines[v] lists the lines stopping at v

        for(int i=0;i<n;i++) {

            int m;
            cin >> m;

            route[i].resize(m);

            for(int j=0;j<m;j++) {
                cin >> route[i][j];
                lines[route[i][j]].push_back(i);
            }
        }

        int a, b;
        cin >> a >> b;

        vector<int> dist(s+1, -1);   // dist[v] = fewest rides needed to reach stop v
        vector<bool> used(n, false); // a line is worth boarding only once

        queue<int> q;

        dist[a] = 0;
        q.push(a);

        while(!q.empty()) {

            int v = q.front();
            q.pop();

            for(int i=0;i<lines[v].size();i++) {

                int line = lines[v][i];

                if(used[line]) continue; // every stop of this line is already reached
                used[line] = true;

                for(int j=0;j<route[line].size();j++) {

                    int to = route[line][j];

                    if(dist[to] == -1) { // first time we see it, so this is the fewest rides
                        dist[to] = dist[v] + 1;
                        q.push(to);
                    }
                }
            }
        }

        cout << dist[b] << "\n"; // -1 already means "cannot get there"
    }

    return 0;
}
```

## Complexity

Time $O(s + \sum m)$
Memory $O(s + \sum m)$
