
## Approach

The definition suggests the algorithm: measure every pair and keep the largest. A search from one outpost gives its distance to all the others in $O(n)$, so running one from every outpost costs $O(n^2)$ - which at $n = 10^5$ is $10^{10}$ steps. Far too slow, but it is worth writing down, because it is what we are going to beat twice.

### Rooting the tree

Root the park at outpost $1$. Every route has a **highest** outpost, the one closest to the root, and from there it goes down into two different children - or ends right at the top. So if

$down[v]$ - the number of trails on the longest walk from $v$ straight down into its own subtree

then the best route whose highest outpost is $v$ is the sum of the two largest $down[c] + 1$ over $v$'s children, taking the missing ones as $0$. And $down[v]$ itself is the largest of those same values:

$$down[v] = \max_{c \text{ a child of } v} (down[c] + 1)$$

One walk over the tree fills this in, children before parents, and the answer is the largest sum found at any outpost. That is $O(n)$ and it is already a complete solution.

### Two searches instead

There is a shorter one, and it needs no rooting at all.

**Start anywhere and walk to the farthest outpost you can. That outpost is the end of a longest route.** So one search from outpost $1$ finds an outpost $u$, and a second search from $u$ measures the diameter directly - its largest distance is the answer.

Why is the farthest outpost always an endpoint? Root at the outpost we started from, and let $u$ be a deepest outpost. Take any longest route, call its highest outpost $t$, and let it descend $d_1$ into one child of $t$ and $d_2 \le d_1$ into another, so the route is $d_1 + d_2$ long and its ends are at depths $depth(t) + d_1$ and $depth(t) + d_2$. Since $u$ is a deepest outpost, $depth(u) \ge depth(t) + d_1$.

- If $u$ sits under a different child of $t$ than the deeper end does, or is not under $t$ at all, the route from $u$ to that deeper end meets it at $t$ or higher, so it is at least $(depth(u) - depth(t)) + d_1 \ge d_1 + d_1$ long.
- Otherwise $u$ is under the same child as the deeper end, and then the route from $u$ to the **other** end meets it exactly at $t$, so it is $(depth(u) - depth(t)) + d_2 \ge d_1 + d_2$ long.

Either way $u$ is one end of a route at least as long as the longest, so it is an endpoint of a longest route too.

Two searches is $O(n)$ as well, but it is a handful of lines, and since a queue does the walking there is no recursion - which matters, because a park shaped like a single line of $10^5$ outposts would mean $10^5$ nested calls for the rooted version.

**Careful:** one search is not enough. It measures how far things are from **outpost $1$**, which is a different question - on the example it reports $3$ rather than $6$, because outpost $1$ sits in the middle of the longest route. The first search is only there to find a starting point for the second.

## Example

The first testcase, with the first search starting at outpost $1$:

| search | starts at | distances it finds | farthest |
| ---- | ---- | ---- | ---- |
| first | $1$ | $1:0$, $2:1$, $3:1$, $4:2$, $5:2$, $6:3$, $7:3$ | $6$ |
| second | $6$ | $6:0$, $4:1$, $2:2$, $1:3$, $3:4$, $5:5$, $7:6$ | $7$ |

The first search never sees a distance above $3$. The second one starts from an end of the longest route and walks the whole thing, ending at outpost $7$ at distance $6$ - the answer. Outposts $6$ and $7$ are tied at distance $3$ in the first search, and starting the second one from $7$ instead would end at $6$, also at distance $6$: which end we find first does not matter.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int n;
vector<vector<int>> adj;
vector<int> dist;

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

//fills dist with the number of trails from start to every outpost, and returns
//the outpost that ends up farthest away
int bfs(int start){

    queue<int> q;

    dist = vector<int>(n + 1, -1); //-1 means not reached yet, so no visited vector is needed

    dist[start] = 0;
    q.push(start);

    int farthest = start;

    while(!q.empty()){

        int v = q.front();
        q.pop();

        if(dist[v] > dist[farthest]){
            farthest = v;
        }

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            if(dist[to] == -1){ //mark it now, not when it leaves the queue
                dist[to] = dist[v] + 1;
                q.push(to);
            }
        }
    }

    return farthest;
}

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        cin>>n;

        adj = vector<vector<int>>(n + 1); // a fresh tree for every testcase

        for(int i=0;i<n-1;i++){
            int u, v;
            cin>>u>>v;
            addEdge(u, v);
        }

        int u = bfs(1); //the farthest outpost from anywhere is one end of a longest route
        int v = bfs(u); //so measuring from u gives the whole route

        cout<<dist[v]<<'\n';
    }
    return 0;
}
```

## Complexity

Time $O(n)$
Memory $O(n)$
