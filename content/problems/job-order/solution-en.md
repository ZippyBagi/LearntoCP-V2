
## Approach

This is Kahn's algorithm from the lesson, with two small adjustments.

### Which way does the arrow point?

The input line `x y` says job $y$ comes **before** job $x$, so the arrow runs $y \rightarrow x$ - the second number is the source. Getting this backwards produces a perfectly valid topological order of the reversed graph, which is wrong in a way that still looks plausible, so it is worth double-checking on the example before trusting anything.

With that fixed, `indegree[v]` counts how many jobs have to be finished before $v$ can start, and a job is ready exactly when its indegree hits $0$.

### Getting the smallest order

The lesson's queue hands back **some** valid order - whichever one the queue's arrival order happens to produce. We need a specific one, and the rule is short: at every step, among all jobs that are currently ready, take the **smallest-numbered** one.

That is greedy, and it is correct because the choice is free: every ready job can legally go next, and picking the smallest one cannot lock a smaller job out later - a job that is ready stays ready, since nothing ever raises an indegree back up. So the earliest position where our order could differ from another valid one, ours has the smaller number.

Turning "smallest ready job" into code is a one-word change, exactly as the lesson's closing note says:

~!
```cpp
priority_queue<int, vector<int>, greater<int>> q;
```

`greater<int>` flips the default max-heap into a min-heap, so `q.top()` is the smallest ready job rather than the largest. The only other change is `q.top()` where the lesson has `q.front()`.

**Careful:** this costs $O(\log n)$ per push and pop instead of $O(1)$, so the total becomes $O(n \log n + m)$ rather than $O(n + m)$. Still comfortably fast here, and there is no way around it - the plain queue simply cannot promise the smallest order.

The statement guarantees an order exists, so we never have to handle the "queue ran dry early" case.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int n, m;
        cin>>n>>m;

        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);

        for(int e=0;e<m;e++){
            int x, y;
            cin>>x>>y;      // y has to be done before x, so the arrow goes y -> x
            adj[y].push_back(x);
            indegree[x]++;
        }

        priority_queue<int, vector<int>, greater<int>> q; // smallest ready job first

        for(int v=0;v<n;v++){
            if(indegree[v]==0){ // nothing has to come before v
                q.push(v);
            }
        }

        vector<int> topo;

        while(!q.empty()){

            int v = q.top();
            q.pop();

            topo.push_back(v);

            for(int i=0;i<adj[v].size();i++){

                int to = adj[v][i];

                indegree[to]--; // one prerequisite of to is finished

                if(indegree[to]==0){ // to is now free to be done
                    q.push(to);
                }
            }
        }

        for(int i=0;i<topo.size();i++){
            cout<<topo[i]<<(i+1<(int)topo.size() ? ' ' : '\n');
        }
    }
    return 0;
}
```

## Complexity

Time $O(n \log n + m)$
Memory $O(n + m)$
