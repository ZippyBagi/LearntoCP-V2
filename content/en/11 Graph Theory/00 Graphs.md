>In this lesson we will learn about graphs - the structure hiding behind google maps, networks, and a huge share of the problems you will ever solve.

So far our data has been a line of values (a vector) or a rectangle of them (a matrix). Both work because the shape is fixed.

But look at a road map. Some cities have one road leading out, some have five. There is no row and no column - what matters is only **who is connected to whom**.

That is a **graph**, and once you can see it, you start seeing it everywhere: cities and roads, people and friendships, pages and links, states of a puzzle and the moves between them.

### Vertices and edges

A graph is two things:

- **vertices** (also called nodes) - the things themselves, drawn as circles
- **edges** - the connections between them, drawn as lines

Two vertices joined by an edge are **neighbours**. 

The number of edges leaving a vertex is its **degree**.

For this whole chapter we will use one graph: 7 cities, joined by the roads `1-2`, `1-3`, `2-4`, `2-5`, `3-6`, `5-7` and `6-7`.

	![[graph-running-example.png|The chapter's running graph of 7 vertices joined by the 7 edges 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 and 6-7, with vertex 2 annotated as having degree 3]]

A few more words we will need:

- a **path** is a sequence of vertices where each one is a neighbour of the next: `1 2 5 7` is a path
- a **cycle** is a path that returns to where it started: `1 2 5 7 6 3 1`
- a graph is **connected** if there is a path between every pair of vertices

Throughout the chapter, `n` is the number of vertices and `m` is the number of edges.

### Kinds of graphs

Problems describe graphs in different flavours, and the wording tells you which one you have:

- **Undirected** - an edge works both ways (a road).
- **Directed** - it works one way only (a one-way street, a "follows" on social media).
- **Unweighted** - every edge is the same (a road is a road).
- **Weighted** - each edge carries a number (length, cost, time).

This chapter is entirely undirected and unweighted. Everything here still applies to the other kinds, with small changes we will make when we get to them.

### The adjacency list

We need to store the graph in a way that answers the question we actually ask: **who are the neighbours of `v`?**

The answer is a vector of vectors. `adj[v]` is the list of neighbours of `v`, and nothing else.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n, m;
    cin>>n>>m; //n cities, m roads

    vector<vector<int>> adj(n+1); //adj[v] holds the neighbours of v

    for(int i=0;i<m;i++){

        int u, v;
        cin>>u>>v;

        adj[u].push_back(v);
        adj[v].push_back(u); //the road goes both ways
    }

    for(int v=1;v<=n;v++){

        cout<<v<<": ";
        for(int i=0;i<adj[v].size();i++){
            cout<<adj[v][i]<<" ";
        }
        cout<<'\n';
    }

    return 0;
}
```
Input:
`7 7` - n and m
`1 2`
`1 3`
`2 4`
`2 5`
`3 6`
`5 7`
`6 7`
Output:
`1: 2 3`
`2: 1 4 5`
`3: 1 6`
`4: 2`
`5: 2 7`
`6: 3 7`
`7: 5 6`

Two details worth noticing. We size the vector `n+1` so that vertex `1` sits at index `1` - almost every problem numbers vertices from 1, and fighting that only creates bugs. And we push the edge **twice**, once in each direction, because the road is undirected.

Memory is **O(n + m)**, and listing the neighbours of `v` costs exactly as much as `v` has neighbours. This is the representation you should reach for by default.

### The adjacency matrix

Sometimes the question is different: **is there an edge between `u` and `v`?** With an adjacency list that means scanning `adj[u]`. With a matrix it is one lookup.

`g[u][v]` is simply `true` when the edge exists.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int main(){

    int n, m;
    cin>>n>>m;

    vector<vector<bool>> g(n+1, vector<bool>(n+1, false));

    for(int i=0;i<m;i++){

        int u, v;
        cin>>u>>v;

        g[u][v] = true;
        g[v][u] = true;
    }

    cout<<g[1][3]<<'\n'; //is there a road between 1 and 3?
    cout<<g[1][4]<<'\n'; //and between 1 and 4?

    return 0;
}
```
Input:
`7 7` - the same 7 roads as above
Output:
`1`
`0`

The price is memory. The matrix is $n^2$ cells whether the graph has a million edges or three, which caps it at roughly `n = 5000`. It also cannot list the neighbours of `v` without checking all `n` cells in the row.

	![[graph-list-vs-matrix.png|The same 7 vertex graph stored two ways, as an adjacency list using 14 entries and as a 7 by 7 adjacency matrix using 49 cells, most of them zero]]

| | Adjacency list | Adjacency matrix |
| ---- | ---- | ---- |
| Memory | O(n + m) | O(n^2) |
| Neighbours of `v` | O(degree of v) | O(n) |
| Is `u-v` an edge? | O(degree of u) | O(1) |
| Good when | almost always | `n` is small and the graph is dense |

>Note:
>A graph with `n` vertices can have up to $\frac{n(n-1)}{2}$ edges. When `m` is close to that the graph is called **dense**, and when it is far below - which is the usual case - it is **sparse**. The adjacency list is built for sparse graphs, which is why it wins almost every time.
