>In this lesson we will learn about the friendliest kind of graph - the tree, where almost every hard question becomes easy.

Take our 7 city map and close one road, the one between `6` and `7`. Every city is still reachable from every other, but now there is no way to go in a circle.

A connected graph with no cycles is a **tree**, and a surprising amount of the world is shaped like one: family trees, folder structures, the chain of calls a recursive function leaves behind.

	![[tree-from-graph.png|The 7 vertex graph with its 7 edges and a cycle on the left, and the same graph on the right after removing edge 6-7, leaving 6 edges, no cycle, and still connected]]

### What makes a tree

The definition is two words - **connected** and **no cycles** - but two consequences follow immediately, and both are used constantly.

**A tree with `n` vertices has exactly `n - 1` edges.**

**Between any two vertices there is exactly one path.** There is at least one because the graph is connected. If there were two different paths between the same pair, going out along one and back along the other would trace a cycle - which cannot exist.

This second fact is the one that does the real work. In a general graph, finding a route between two vertices is a search. In a tree, the route is unique, so the only route **is** the shortest path. There is nothing to choose.

### Rooting a tree

A tree drawn on paper has no top - `1` is not more important than `5`. But almost every algorithm becomes easier once we pick one vertex and call it the **root**, then hang the whole tree beneath it.

Once a root is chosen, the family vocabulary appears:

- the **parent** of `v` is its neighbour one step closer to the root. The root has no parent.
- the **children** of `v` are its other neighbours - the ones one step further away
- the **depth** of `v` is its distance from the root
- a **leaf** is a vertex with no children

Rooting changes nothing about the tree itself. It is a way of looking at it, and we are free to root the same tree anywhere we like.

	![[tree-rooted-at-1.png|The same tree hung from vertex 1 and drawn in depth levels 0 to 3, with the root in orange, vertices that have children outlined, and the leaves 4, 6 and 7 in green]]

### Parent and depth with DFS

Computing all of this is one DFS, with one small trick.

Walking a tree, the only edge that leads back toward the root is the one we arrived on. So instead of a `visited` array, we simply pass the parent down and refuse to walk back into it. No cycles means there is no other way to return.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> adj(n+1);
vector<int> parent(n+1, 0);
vector<int> depth(n+1, 0);

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

void dfs(int v, int p, int d){

    parent[v] = p;
    depth[v] = d;

    for(int i=0;i<adj[v].size();i++){

        int to = adj[v][i];

        if(to != p){ //the only edge leading back is the one we came from
            dfs(to, v, d+1);
        }
    }
}

int main(){

    addEdge(1,2);
    addEdge(1,3);
    addEdge(2,4);
    addEdge(2,5);
    addEdge(3,6);
    addEdge(5,7); //six edges for seven vertices - a tree

    dfs(1, 0, 0); //root the tree at 1

    for(int v=1;v<=n;v++){
        cout<<v<<": parent "<<parent[v]<<", depth "<<depth[v]<<'\n';
    }

    return 0;
}
```
Output:
`1: parent 0, depth 0`
`2: parent 1, depth 1`
`3: parent 1, depth 1`
`4: parent 2, depth 2`
`5: parent 2, depth 2`
`6: parent 3, depth 2`
`7: parent 5, depth 3`

The root reports parent `0`, which is our way of saying "nobody" - vertices are numbered from `1`, so `0` is safely unused. Vertices `4`, `6` and `7` never made a recursive call, so they are the leaves.

Since a tree has `n - 1` edges, this DFS is **O(n)**.

>Note:
>`if(to != p)` works only for a tree! For every other type of graph, use a `visited` vector

### Forests

Drop the requirement that the graph be connected, keep "no cycles", and you get a **forest** - a collection of trees, each one a separate component.

Everything above still works; you just loop over the vertices and root each component separately.

>A tree is where graph problems go to become easy. Whenever you spot `n - 1` edges in the constraints, or the statement quietly says the roads connect all cities without any loops, you have one - and the unique path property is usually the key to the whole problem.
