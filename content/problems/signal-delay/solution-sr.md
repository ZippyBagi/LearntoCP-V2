
## Pristup

Svaki računar prosleđuje signal čim ga primi, pa je vreme kad ga dobije dužina najkraćeg puta od $s$ - a uz pozitivna vremena na kanalima to je Dajkstra. Mreža je gotova kad ga primi poslednji računar, pa je rešenje **maksimum** tih $n$ rastojanja, a računar do kog ništa ne vodi zadrži svoju beskonačnost i unese je u taj maksimum, čime slučaj $-1$ postaje jedno poređenje na kraju. Ulaz broji računare od $1$, a nizovi idu od $0$, pa oduzmi jedan na oba kraja svakog kanala i na $s$.

**Pažnja:** kanali su jednosmerni, pa kanal ulazi u **jednu** listu suseda, ne u obe. Ubacivanje u obe tiho pretvara ovo u lakši zadatak - skoro ništa ne ostane nedostižno, a rešenja ispadaju premala, $5$ umesto $7$ na primeru.

## Kod

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

## Složenost

Vremenska složenost je $O(m \log n)$.
Memorijska složenost je $O(n + m)$.
