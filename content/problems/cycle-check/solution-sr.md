
## Pristup

"Mogu li da odem sa planete i vratim se na nju" je pitanje "da li ovaj usmereni graf sadrži **ciklus**", a to resava Kanov Algoritam

Pokreni algoritam kao i obično: prebroj koliko teleporta stiže na svaku planetu, kreni od onih na koje ne stiže nijedan, i svaki put kad se neka planeta poseti, smanji brojač svemu do čega ona vodi. Planeta ulazi u red tačno onda kad joj brojač padne na $0$.

A sad zapažanje. Planeta na ciklusu **nikad** ne može da stigne do $0$: jedan od teleporta koji na nju stižu dolazi sa druge planete istog ciklusa, a ta i sama čeka da se ciklus prvo raščisti. Zato se red isprazni dok su te planete i dalje nedirnute, pa broj posećenih planeta ispadne manji od $v$.

$$\text{ciklus postoji} \iff \text{visited} < v$$

Ne moramo čak ni da pamtimo poredak, samo koliko je planeta izašlo.


## Kod

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

## Složenost

Vremenska složenost je $O(v + e)$.
Memorijska složenost je $O(v + e)$.
