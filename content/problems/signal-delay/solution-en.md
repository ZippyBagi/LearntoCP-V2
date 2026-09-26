
## Approach

Every computer forwards the signal the moment it arrives, so the time it receives it is the length of the shortest route from $s$ - and with positive channel times that is Dijkstra. The network is finished when the last computer has it, so the answer is the **maximum** of the $n$ distances, and a computer nothing ever reaches keeps its infinity and carries it into that maximum, which makes the $-1$ case a single comparison at the end. The input numbers computers from $1$ while the arrays run from $0$, so subtract one from both ends of every channel and from $s$.

**Careful:** the channels are one-way, so a channel goes into **one** adjacency list, not both. Pushing it both ways quietly turns this into an easier problem - almost nothing stays unreachable and the answers come out too small, $5$ instead of $7$ on the example.

## Code

solution.cpp
```cpp
#include <bits/stdc++.h>

using namespace std;

const int INF = 1e9; //stands in for infinity

int n;
vector<vector<pair<int,int>>> adj; //adj[u] holds pairs (neighbour, weight)
vector<int> dist;

void addEdge(int u, int v, int w){ //one way only - the channels are directed
    adj[u].push_back({v, w});
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

    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin>>t;

    while(t--){

        int m;
        cin>>n>>m;

        adj = vector<vector<pair<int,int>>>(n); // a fresh graph for every testcase
        dist = vector<int>(n, INF);

        for(int i=0;i<m;i++){
            int u, v, w;
            cin>>u>>v>>w;
            addEdge(u-1, v-1, w); // the input numbers the computers from 1
        }

        int s;
        cin>>s;

        dijkstra(s-1);

        int answer = 0;

        for(int v=0;v<n;v++){
            answer = max(answer, dist[v]); // the signal is done when the last one has it
        }

        cout<<(answer == INF ? -1 : answer)<<'\n'; // INF means some computer was never reached
    }
    return 0;
}
```

## Complexity

Time $O(m \log n)$
Memory $O(n + m)$
