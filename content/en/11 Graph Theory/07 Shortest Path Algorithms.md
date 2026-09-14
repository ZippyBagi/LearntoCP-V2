>In this lesson we will learn about 2 very useful shortest paths algorithms - Bellman Ford and Floyd Warshall

### Bellman Ford

Remember the one limitation that Dijkstra's algorithm had - **weights can not be negative**, Bellman Ford fixes that!

	![[bellman-ford-graph.png|Directed graph of five vertices where the edges B to C of weight -3 and D to E of weight -2 are drawn in red, with the distances from A shown underneath as 0, 4, 1, 5 and 3]]

Lets first look at the shortest path between any two nodes,

It can have, at most **n-1** edges! (If it had any more, it would form an unnecessary cycle)

This means that we are guaranteed to find the shortest path by comparing all the nodes **n-1** times!

How do we compare them?

Comparing them is as simple as checking if we can get from one node to another faster: `if (dist[i] < dist[j] + w)` -> update the distance

One more thing to consider is a case when no path exists: **Negative Weight Cycles**

	![[bellman-ford-negative-cycle.png|Cycle A to B to C and back to A with weights 2, -4 and -1, beside a chain showing the total falling 0, -3, -6, -9 and on toward minus infinity]]

There is no shortest path here, going from `A` to `B` to `C` always reduces the path by 3, this means that we can repeat doing this infinitely and get a $-\infty$ length.

Bellmen Ford can detect this - If a solution is not found in `n-1` steps, then there exists a **Negative Weight Cycle**
### Code:

Literally just 2 for loops:
~!
```c++
//adj[i] is assumed to be {from, to, weight}, the code can easily be adapted to any other representation, this is usually the simplest one
vector<int> bellmanFord(int n, vector<vector<int>>& adj) { 
    
	vector<int> dist(n, 1e8);
	dist[0] = 0;
  
	for (int i = 0; i < n; i++) {
	    
		for (vector<int> edge : adj) { 
		
			int from = edge[0];
			int to = edge[1];
			int w = edge[2];
			
			if (dist[from] != 1e8 && dist[from] + w < dist[to]) {
			    
                if(i == n - 1)
                    return {-1}; // A negative weight cycle
               
                dist[to] = dist[from] + w;
            }
		}
	}

    return dist;
}
```
Time complexity: O( V * E ) - where V is the number of verticies(nodes) and E the number of edges 

### Floyd Warshall

Another really useful algorithm is Floyd Warshall, it lets us get the shortest path between all nodes in O($n^3$).

	![[floyd-warshall-graph.png|Directed graph of four vertices numbered 0 to 3, with the edges 0 to 1 of weight 4, 0 to 2 of 11, 1 to 2 of 3, 1 to 3 of 9, 2 to 0 of 6 and 2 to 3 of 2 listed again beside it]]

Just like with Dijkstra, the weights can not be negative!

The idea is as brute force as it gets, start with a 2d matrix of connections:

	![[floyd-warshall-matrix.png|The same four vertex graph beside a 4 by 4 matrix holding 0 down the diagonal, each edge weight in its own cell, and the infinity sign wherever there is no direct edge]]

If to get from any node `A` to any other node `B`, we pass through node `C`, then we can assume that if `AB` is optimal, `AC` and `CB` also have to be optimal!

Now lets treat each node as a `C`, aka, lets see how many other nodes does the current node connect. (We will do this in order from 0 to n, this guarantees that when we compute the current C it is as best as it can be right now)

Now we can simply do a triple for loop, for each possible intermediate node `C`, try every other node as a `A` and for each of those try every other node as a `B`, if something improves improve it.

When we get to `C == n` we have solved the problem.

	![[floyd-warshall-c0.png|Vertex 0 marked as the intermediate one and its row and column shaded, with the one improved cell showing the distance from 2 to 1 falling from infinity to 10]]

	![[floyd-warshall-c1.png|Vertex 1 marked as the intermediate one, with the distance from 0 to 2 falling from 11 to 7 and the distance from 0 to 3 falling from infinity to 13]]

	![[floyd-warshall-c2.png|Vertex 2 marked as the intermediate one, with three more cells improving: 0 to 3 falls from 13 to 9, 1 to 0 from infinity to 9, and 1 to 3 from 9 to 5]]

#### Code:

~!
```c++
void floydWarshall(vector<vector<int>> &dist, int n) {

    int INF = 1e8;

    // for each intermediate vertex
    for (int c = 0; c < n; c++) {

        // Pick all vertices as source one by one
        for (int a = 0; a < n; a++) {

            // Pick all vertices as destination, for the above picked source
            for (int b = 0; b < n; b++) {

                // shortest path from i to j 
                if(dist[a][c] != INF && dist[c][b]!= INF ){
                
	                dist[a][b] = min(dist[a][b], dist[a][c] + dist[c][b]);
                }
                    
            }
        }
    }
}
```

Time complexity: O($n^3$)

We also could have solved this by running Dijkstra from every node.

>Floyd Warshall is better when the graph is dense(has lots of edges), and Dijkstra from every node is better for sparse graphs. Nevertheless because of its implementation simplicity, Floyd Warshall is most commonly used!

