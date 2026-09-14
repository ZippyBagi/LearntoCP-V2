>In this lesson we will learn about the most famous shortest paths algorithm - Dijkstra's Algorithm

Dijkstra's solves shortest paths for **positive weighted graphs** (graphs where traversing edges costs us something)

We can imagine this as cities and roads, where we want to find the shortest path from city A to city B.

We will be using this graph as an example: 

	![[dijkstra-graph.png|Six cities A to F joined by eight weighted roads: A-B 4, A-C 2, C-B 1, C-D 8, B-E 10, D-E 2, D-F 6 and E-F 3]]

The number on a road is what it costs to drive it. BFS would count roads and answer `A B E` for getting to `E`, two roads - but that route costs `4 + 10 = 14`, and going `A C D E` costs `2 + 8 + 2 = 12` even though it uses three roads. Counting is no longer enough.

>It is very important that the graph contains only positive weights!
### Theory

The main idea of Dijkstra's is that when we visit a node, it is guaranteed that we already know the shortest path to it.

Lets assume that at the start it takes us infinite time to get to each node. 

Starting from `A`, to get from `A` to `A` costs us `0` (we are already there)

Now we go through all neighbors of `A`, and compare the current lowest distance of the neighbor with the distance we get by going through `A`. 

	![[dijkstra-relax.png|The map with A finished, its two roads coloured, and the dist row underneath holding 0 for A, 4 for B, 2 for C and infinity for D, E and F]]

`B` and `C` were both at infinity, and any number beats infinity, so both improve. This comparison is called **relaxing** an edge, and it is the only thing Dijkstra's ever does to a distance.

The next node we will visit is the **one with the shortest current distance!**

	![[dijkstra-pick.png|C is picked next because 2 is smaller than 4, and relaxing its two roads sets D to 10 and lowers B from 4 to 3]]

That is `C` with `2`, not `B` with `4`. And picking it pays off immediately: the road `C-B` costs `1`, so reaching `B` through `C` costs `2 + 1 = 3`, and the `4` we wrote down a moment ago is replaced.

This is why we never finish a node early. A distance stays provisional until its node is the smallest one left.

We repeat this process until all the nodes are visited.

Here is the final solution:

	![[dijkstra-final.png|The finished map with the shortest path tree coloured, and the final distances 0, 3, 2, 10, 12 and 15 for A through F]]


>We can also stop our search when we get to the target node! (If we only wanted the shortest path from `A` to `F`, for example)

If the graph contained negative weights, our **visit the shortest distance** idea would greedily fail, and skip a possible shortcut!

Three cities are enough to break it. `A` reaches `B` for `1` and `C` for `2`, and the road from `C` to `B` costs `-2`:

	![[dijkstra-negative.png|A three city graph where A to B costs 1, A to C costs 2 and C to B costs minus 2, so the route A C B totals 0 and beats the direct road, which Dijkstra had already locked in at 1]]


### Implementation

A data structure that always keeps track of the lowest distance is a **priority queue!** (We will be using `greater<>`)

We need 3 things

- The already mentioned `priority_queue<pair<int,int>> pq` which will store the node and its distance
- A `vector<int> dist` which will store the distances
- A vector of neighbors `vector<vector<pair<int,int>>> adj` which stores the connections and weights

Now we just run a while loop until the priority queue is not empty!

### Code

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 6;
vector<vector<pair<int,int>>> adj(n); //adj[u] holds pairs (neighbour, weight)
vector<int> dist(n, 1e9); //1e9 stands in for infinity

void addEdge(int u, int v, int w){
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
}

void dijkstra(int start){

    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq; //(distance, node)

    dist[start] = 0;
    pq.push({0, start});

    while(!pq.empty()){

        int d = pq.top().first;
        int v = pq.top().second;
        pq.pop();

        if(d > dist[v]){ //an old entry, we already found something better
            continue;
        }

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i].first;
            int w = adj[v][i].second;

            if(dist[v] + w < dist[to]){ //going through v is cheaper
                dist[to] = dist[v] + w;
                pq.push({dist[to], to});
            }
        }
    }
}

int main(){

    addEdge(0,1,4);  //A-B
    addEdge(0,2,2);  //A-C
    addEdge(2,1,1);  //C-B
    addEdge(2,3,8);  //C-D
    addEdge(1,4,10); //B-E
    addEdge(3,4,2);  //D-E
    addEdge(3,5,6);  //D-F
    addEdge(4,5,3);  //E-F

    dijkstra(0);

    for(int v=0;v<n;v++){
        cout<<(char)('A'+v)<<": "<<dist[v]<<'\n';
    }

    return 0;
}
```
Output:
`A: 0`
`B: 3`
`C: 2`
`D: 10`
`E: 12`
`F: 15`
Time Complexity: **O(m log n)**
Space Complexity: **O(n + m)**

The pair is `(distance, node)` and not the other way around, because a `priority_queue` compares pairs by their first element. Putting the distance first is what makes it order by distance.

>Note:
>Reconstructing the route works exactly as it did with BFS: keep a `parent` array, and write `parent[to] = v` on the same line where you improve `dist[to]`.