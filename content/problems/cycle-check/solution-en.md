
## Approach

"Can I leave a planet and get back to it" is the question "does this directed graph contain a **cycle**", and we can solve that using Khan's algorithm

Run the algorithm as usual: count how many teleporters arrive at each planet, start from the ones with none, and every time a planet is taken out, drop the arrival count of everything it leads to. A planet joins the queue exactly when its count reaches $0$.

Now the observation. A planet on a cycle can **never** reach count $0$: one of the teleporters arriving at it comes from another planet on the same cycle, which is itself waiting for the cycle to clear first. So the queue runs dry with those planets still untouched, and the count of planets we managed to take out comes back short of $v$. 

$$\text{cycle exists} \iff \text{visited} < v$$

We do not even need to store the order, only how many planets came out.

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

        int v, e;
        cin>>v>>e;

        vector<vector<int>> adj(v);
        vector<int> indegree(v, 0);

        for(int i=0;i<e;i++){
            int a, b;
            cin>>a>>b;      // a teleporter leads from a to b
            adj[a].push_back(b);
            indegree[b]++;
        }

        queue<int> q;

        for(int i=0;i<v;i++){
            if(indegree[i]==0){ // no teleporter arrives here
                q.push(i);
            }
        }

        int visited = 0;

        while(!q.empty()){

            int node = q.front();
            q.pop();

            visited++;

            for(int i=0;i<adj[node].size();i++){

                int to = adj[node][i];

                indegree[to]--;

                if(indegree[to]==0){
                    q.push(to);
                }
            }
        }

        cout<<(visited < v ? "yes" : "no")<<'\n'; // planets left over means a cycle
    }
    return 0;
}
```

## Complexity

Time $O(v + e)$
Memory $O(v + e)$
