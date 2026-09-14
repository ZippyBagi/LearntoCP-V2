>In this lesson we will learn what a shortest path is, and how to find it
### What is a shortest path?

A **path** from `u` to `v` is a sequence of vertices where each one is a neighbour of the next, starting at `u` and ending at `v`. Its **length** is the number of edges on it - not the number of vertices.

	![[graph-running-example.png|The chapter's running graph of 7 vertices joined by the 7 edges 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 and 6-7, with vertex 2 annotated as having degree 3]]
	
From `1` to `6` our graph offers two of them:

- `1 3 6` - length 2
- `1 2 5 7 6` - length 4

A **shortest path** is any path of minimum length, and that minimum is the **distance** between the two vertices, written `d(u, v)`. So `d(1, 6) = 2`.

Three things to keep in mind:

- there can be **many** shortest paths - from `1` to `7` both `1 2 5 7` and `1 3 6 7` have length 3. A problem asking for "the" shortest path accepts any of them.
- if there is no path at all, the distance is infinite - the two vertices sit in different components
- `d(v, v) = 0`, since staying put costs nothing

### Why BFS finds them

Remember how BFS spreads: the start, then everything one edge away, then everything two edges away.

That ordering is the whole proof. When BFS is about to hand out the vertices at distance `k + 1`, it has already handed out every single vertex at distance `k` or less. So a vertex that is still unvisited at that moment cannot be closer than `k + 1`.

	![[bfs-rings.png|The graph laid out in four horizontal bands by distance from vertex 1, shaded from dark to light for d equals 0, 1, 2 and 3, with every edge joining one band to the next]]

In other words: **the first time BFS sees a vertex, it is seeing it along a shortest path.** No later route can be better, which is why the `visited` check never throws away anything useful.

This is also exactly why DFS cannot do it. DFS dives, so the first time it sees a vertex it may have taken a huge detour to get there.

### The code

The change is small: `visited` becomes `dist`, and `-1` means "not reached yet". One array now does both jobs, because a vertex has a distance exactly when it has been visited.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> adj(n+1);
vector<int> dist(n+1, -1); //-1 means "not reached yet"

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

void bfs(int start){

    queue<int> q;

    dist[start] = 0;
    q.push(start);

    while(!q.empty()){

        int v = q.front();
        q.pop();

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            if(dist[to] == -1){ //first time we see it, so this is the shortest way in
                dist[to] = dist[v] + 1;
                q.push(to);
            }
        }
    }
}

int main(){

    addEdge(1,2);
    addEdge(1,3);
    addEdge(2,4);
    addEdge(2,5);
    addEdge(3,6);
    addEdge(5,7);
    addEdge(6,7);

    bfs(1);

    for(int v=1;v<=n;v++){
        cout<<v<<": "<<dist[v]<<'\n';
    }

    return 0;
}
```
Output:
`1: 0`
`2: 1`
`3: 1`
`4: 2`
`5: 2`
`6: 2`
`7: 3`

One BFS, and we have the distance from `1` to **every** vertex at once - still **O(n + m)**. Any vertex left holding `-1` at the end is simply unreachable.

### Reconstructing the path

Distances are often enough, but sometimes a problem wants the route itself. We do not need to store whole paths: when we first reach `to` from `v`, we write down that `v` is the one who let us in.

~!
```c++
vector<int> parent(n+1, 0); //parent[v] is the vertex we reached v from
```

Inside the `if`, one line joins the other two:

~!
```c++
            if(dist[to] == -1){
                dist[to] = dist[v] + 1;
                parent[to] = v; //remember who let us in
                q.push(to);
            }
```

Now walking from `7` back to `1` is just following `parent` until we fall off the start, which still holds `0`. That gives the path backwards, so we reverse it:

~!
```c++
    vector<int> path;
    int v = 7;

    while(v != 0){ //walk backwards until we fall off the start
        path.push_back(v);
        v = parent[v];
    }

    reverse(path.begin(), path.end());

    for(int i=0;i<path.size();i++){
        cout<<path[i]<<" ";
    }
```
Output: `1 2 5 7`

Three edges, matching `dist[7] = 3`. The other shortest path `1 3 6 7` is just as correct - BFS returns the one it happened to find first.

>Note:
>All of this rests on one assumption: **every edge costs the same**. BFS counts edges, so the moment a problem gives roads different lengths, the fewest-roads route stops being the shortest route and BFS gives the wrong answer. Weighted graphs need Dijkstra's algorithm instead.
