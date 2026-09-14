>In this lesson we will learn about an algorithm that tells us a useful way to traverse a graph

**Topological Sorting** is an order of traversal of a graph, that guarantees that for every edge from node `a` to node `b`, `a` comes before `b`!

### An Example

Imagine you need to make an education plan for a collage. You have 20 courses, and need to plan in which order they need to be taught.

The problem is that some courses have prerequisites (You can't study calculus before finishing basic algebra). 

This is where topological sorting comes in.

We start with a course that has no prerequisites. After we complete it, we can do another course with no prerequisites, or we can move on to a course that had this one as it's prerequisite.

We repeat this process until all courses are completed.

This order is called the **Topological Ordering**

### The graph we will use

Six courses, and an arrow from `a` to `b` meaning "`a` has to be finished before `b`":

`1 -> 3`, `1 -> 4`, `2 -> 3`, `2 -> 5`, `3 -> 6`, `4 -> 6`, `5 -> 6`

Courses `1` and `2` have no prerequisites, so either one can start the plan. Course `6` needs three courses behind it, so it can only ever come last.

Lay the courses out in a line in the order we teach them, and the rule becomes something we can see: an ordering is valid when **every arrow points to the right**. One arrow pointing back means we scheduled a course before its prerequisite.

	![[topological-order.png|The six course graph on the left, and on the right two linear orders of the same vertices: 1 2 4 3 5 6 where all seven arrows point forwards, and 1 4 3 2 5 6 where the arrow from 2 to 3 points backwards and breaks the ordering]]

>Note:
>A single graph can have multiple Topological Orderings. 

>Note:
>For a graph to have a topological ordering, it needs to be directional, and it needs to have no cycles!

### Implementation

To find a Topological Ordering efficiently, we use **Kahn's algorithm!**

For every node, we first need to find out how many other nodes point to it (its **indegree**).

Then we add all the nodes with indegree `0` to a queue (The queue will store all elements that can be visited).

As we pop the queue, we first mark the node as visited, then reduce the indegree of all its neighbors by one.

If this process results in a neighbor having an indegree of `0`, we put it in the queue. 

This process continues until the queue is empty, and the resulting order represents one valid topological sort of the graph.

	![[kahn-steps.png|Kahn's algorithm on the six course graph, one row per step, showing the indegree of every vertex dropping as its prerequisites are popped, the queue holding the vertices whose indegree has reached zero, and topo filling up with 1 2 4 3 5 6]]

Read the `indegree` row by row. Popping `1` drops the indegree of `3` and `4`, and `4` reaches `0`, so it joins the queue. Nothing is ever pushed twice, because a vertex hits `0` exactly once.

The queue is where the freedom lives. After popping `1` and `2` there are three courses ready to go, and any of them could be next - which is why the same graph has several valid orderings.

### Cycles

>If the queue is empty, but not all nodes have been visited, this means that the graph has a cycle!

Add one arrow from `6` back to `3` and the plan becomes impossible: `3` waits for `6`, and `6` waits for `3`. Neither indegree ever reaches `0`.

	![[topological-cycle.png|The same graph with an extra arrow from 6 back to 3, where vertices 1, 2, 4 and 5 are output normally but 3 and 6 stay stuck in the cycle, so the queue empties with topo holding only four of the six vertices]]

The algorithm does not hang, and it does not need a separate cycle check. It simply runs out of vertices with indegree `0`, and `topo` comes back short. Comparing its size with `n` is the whole test.

### Code: 

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 6;
vector<vector<int>> adj(n+1);
vector<int> indegree(n+1, 0);

void addEdge(int u, int v){ //the edge goes from u to v
    adj[u].push_back(v);
    indegree[v]++;
}

int main(){

    addEdge(1,3);
    addEdge(1,4);
    addEdge(2,3);
    addEdge(2,5);
    addEdge(3,6);
    addEdge(4,6);
    addEdge(5,6);

    queue<int> q;

    for(int v=1;v<=n;v++){
        if(indegree[v]==0){ //nothing has to come before v
            q.push(v);
        }
    }

    vector<int> topo;

    while(!q.empty()){

        int v = q.front();
        q.pop();

        topo.push_back(v);

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            indegree[to]--; //one prerequisite of to is finished

            if(indegree[to]==0){ //to is now free to be taught
                q.push(to);
            }
        }
    }

    if(topo.size() < n){ //the queue ran dry with vertices left over
        cout<<"the graph has a cycle";
        return 0;
    }

    for(int i=0;i<topo.size();i++){
        cout<<topo[i]<<" ";
    }

    return 0;
}
```
Output: `1 2 4 3 5 6`

Notice that `addEdge` only pushes one way. An edge of a directed graph is a one-way street, and the second line keeps the indegree up to date as we build.

Every vertex enters the queue once and leaves once, and each edge is looked at exactly once, when its source is popped.

Time Complexity: **O(n + m)**
Space Complexity: **O(n + m)**

>Note:
>Swap the `queue` for a `priority_queue` and you get the smallest valid ordering instead of just any one. Problems ask for that surprisingly often.