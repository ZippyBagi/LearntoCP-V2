>In this lesson we will learn about biconnectivity!

Lets start with a graph

![[image_here - graph with 7 nodes, two clusters of 3 inter-connnected nodes joined by a single middle node]] 

If we take a look at this graph, we can see two clusters of connected nodes, that are joined by a single "middle node".

If we were to remove that node, the graph would split into two separate components! 

We call that node the **articulation point!**

>Any node that, when removed splits the graph into multiple components is called an articulation point!

We can also look at edges,

>Any edge that when removed, splits the graph into multiple components is called a bridge!

A graph that has **zero articulation points** is biconnected!

For example:
![[image here]]

Another definition to go over is the **Biconnected Component (BCC)**

>A biconnected component (BCC) is a maximal subgraph that remains connected even if you remove any single vertex

In other words, its a group of points that stays connected even if you remove any one of it's nodes

In the graph from the first image, that would be (1,2,3)

![[image here - same image as the first one in the page, except nodes 1,2,3 are circled]]

### Finding Bridges and Articulation points

To do so we use a modified DFS.

We keep track of 2 things:

- `tin[i]` - the time at which we first visited a node
- `low[i]` - the lowest `tin` we can reach from `i`, by using at most one back edge

#### Finding a bridge

Now we can define a bridge as: An edge from `i` to `j` where `low[j] > tin[i]`.

In other words we can't return to `i`, or any of it's ancestors without going through `j`

#### Finding an articulation point

A node is an articulation point if it is the root of the DFS tree and has 2 or more children in the tree 

Or, if it has a child `j` and : `low[i] >= tin[j]`

### Code:

```c++
#include <bits/stdc++.h>

using namespace std;

int timer;
vector<vector<int>> adj;
vector<int> tin, low;
vector<bool> visited;
set<int> articulation_points;
vector<pair<int, int>> bridges;

void dfs(int u, int p = -1) {

    visited[u] = true;
    tin[u] = low[u] = timer++;
    int children = 0;

    for (int v : adj[u]) {
        if (v == p) continue; // Skip the edge back to parent
        
        if (visited[v]) { // Back-edge found
            low[u] = min(low[u], tin[v]);
        } else {
        
            // Forward-edge to an unvisited child
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            
            // Check for Articulation Point (Non-root condition)
            if (low[v] >= tin[u] && p != -1) {
                articulation_points.insert(u);
            }
            // Check for Bridge
            if (low[v] > tin[u]) {
                bridges.push_back({min(u, v), max(u, v)});
            }
            children++;
        }
    }
    // Check for Articulation Point (Root condition)
    if (p == -1 && children > 1) {
        articulation_points.insert(u);
    }
}
```

Time Complexity: O(V + E) - where V is the number of vertices and E the number of edges 

It is also important to call this function like this:

~!
```c++
for (int i = 0; i < n; ++i) {
	if (!visited[i]){ 
		dfs(i); 	
	} 
}
```
Because the starting graph could consist of multiple components!