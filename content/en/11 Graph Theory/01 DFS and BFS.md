>In this lesson we will learn the two ways to walk a graph.

Storing a graph is not much use on its own. The first real question is always some version of: standing in city `1`, where can I get to?

	![[graph-running-example.png|The chapter's running graph of 7 vertices joined by the 7 edges 1-2, 1-3, 2-4, 2-5, 3-6, 5-7 and 6-7, with vertex 2 annotated as having degree 3]]

Try answering it by hand. From `1` we walk to `2`, from `2` to `5`, from `5` to `7`, from `7` to `6`, from `6` to `3` - and `3` leads straight back to `1`. We have gone in a circle, and nothing stops us going round again.

That is the whole difficulty. A graph is not a list with an end; a walk can return to where it started, so "keep walking" never terminates on its own.

The fix is one array. We write down every vertex we have already stood on, and refuse to step onto it twice:

~!
```c++
vector<bool> visited(n+1, false);
```

Now the walk has to stop, because there are only `n` vertices to cross off. What is still undecided is the order. Standing on a vertex we usually have several unvisited neighbours to choose from, and the choice is not a detail - it produces two genuinely different algorithms.

### Two ways to choose

Think of it as a to-do list of vertices we have seen but not yet explored. Every time we stand somewhere new, its unvisited neighbours go onto the list. The only question is which one we take off next.

**Depth first search** always takes the **newest** one. It walks to a neighbour, and from there straight into one of its neighbours, going as deep as it can. Only when a vertex has no unvisited neighbours left does it back up and try something else.

**Breadth first search** always takes the **oldest** one. It finishes every neighbour of the start before touching anything further away, spreading outwards in rings

On our graph, starting from `1`, the two produce this:

	![[dfs-vs-bfs-order.png|DFS and BFS run side by side from vertex 1 on the same graph, with the edges each walk used coloured and the visiting order badged, giving 1 2 4 5 7 6 3 for DFS and 1 2 3 4 5 6 7 for BFS]]

DFS builds one long chain. It dives `1 2 4`, backs out, dives `5 7 6`, and only from `6` does it finally arrive at `3` - a direct neighbour of the start, reached last of all. BFS never wanders: `1`, then `2 3`, then `4 5 6`, then `7`.

Time Complexity of both: **O(n + m)**.

### DFS - depth first search

"Take the newest" is exactly what a function call does - the call you make now is the one that runs next, and you only continue where you left off once it returns. So recursion gives us DFS for free.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> adj(n+1);
vector<bool> visited(n+1, false);

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

void dfs(int v){

    visited[v] = true;
    cout<<v<<" ";

    for(int i=0;i<adj[v].size();i++){

        int to = adj[v][i];

        if(!visited[to]){ //never step onto a vertex twice
            dfs(to);
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

    dfs(1);

    return 0;
}
```
Output: `1 2 4 5 7 6 3`

The to-do list never appears in the code. It is the call stack, kept for us by the language.

### BFS - breadth first search

"Take the oldest" is FIFO, and that is a **queue**.

Solution.cpp
```c++
#include <bits/stdc++.h>

using namespace std;

int n = 7;
vector<vector<int>> adj(n+1);
vector<bool> visited(n+1, false);

void addEdge(int u, int v){
    adj[u].push_back(v);
    adj[v].push_back(u);
}

void bfs(int start){

    queue<int> q;

    visited[start] = true;
    q.push(start);

    while(!q.empty()){

        int v = q.front();
        q.pop();

        cout<<v<<" ";

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            if(!visited[to]){
                visited[to] = true; //mark it now, not when it leaves the queue
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

    return 0;
}
```
Output: `1 2 3 4 5 6 7`

The rings are visible in the output: `1`, then `2 3`, then `4 5 6`, then `7`.

Mark a vertex visited **when you push it**, not when you pop it. If you wait, a vertex with two neighbours in the current ring gets pushed twice. This leads to duplicates, and unnecessary work.

### DFS without recursion

When writing DFS without recursion, it becomes the same as BFS, except we use a stack instead of a queue!

~!
```c++
void dfs(int start){

    stack<int> st;

    st.push(start);

    while(!st.empty()){

        int v = st.top();
        st.pop();

        if(visited[v]){ //it may have been pushed more than once
            continue;
        }

        visited[v] = true;
        cout<<v<<" ";

        for(int i=0;i<adj[v].size();i++){

            int to = adj[v][i];

            if(!visited[to]){
                st.push(to);
            }
        }
    }
}
```
Output: `1 3 6 7 5 2 4`

Although the order is different from the recursive version, this is still a valid DFS(we just prioritized the right neighbor instead of the left one)

Note also that we check `visited` on the way **out** rather than on the way in. A vertex can sit in the stack more than once, so by the time we pop it a previous copy may already have been handled.

>Note:
>DFS recurses once per vertex, so a graph shaped like a long chain of 200000 vertices means 200000 nested calls, and that is a `stack overflow`. The version above has no such limit, since its stack lives in ordinary memory - which is exactly why it is worth knowing.

### Connected components

A graph does not have to be in one piece. Add two cities `8` and `9` with a single road between them, and no road to the rest - they are now a separate **connected component**.

	![[connected-components.png|A graph in two disconnected pieces, the seven vertex component and a separate pair 8 and 9, showing that a walk from 1 reaches only its own component]]

One walk only finds the piece it starts in. To see the whole graph, start a new one from every vertex nobody has reached yet. The `dfs` function does not change at all - only `main` does:

~!
```c++
int main(){

    addEdge(1,2);
    addEdge(1,3);
    addEdge(2,4);
    addEdge(2,5);
    addEdge(3,6);
    addEdge(5,7);
    addEdge(6,7);
    addEdge(8,9); //two new cities, no road to the rest

    int components = 0;

    for(int v=1;v<=n;v++){

        if(!visited[v]){ //v is in a piece we have not touched yet
            components++;
            dfs(v);
            cout<<'\n';
        }
    }

    cout<<"components: "<<components;

    return 0;
}
```
Output:
`1 2 4 5 7 6 3`
`8 9`
`components: 2`

The loop runs `n` times, but the traversal still visits each vertex once, so counting components is still **O(n + m)**. BFS works here just as well - only the printing order changes.
