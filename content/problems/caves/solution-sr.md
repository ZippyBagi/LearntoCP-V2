
## Pristup

Pogledaj prvo ograničenja: $n$ dvorana, $n - 1$ hodnik, do svake se može stići, nigde se ne ide u krug. To je definicija **stabla**, samo ispisana rečima. A u stablu je ovaj zadatak lak, jer od ulaza do svake dvorane postoji tačno jedan put - nema šta da se bira ni da se optimizuje.

Znači, svaka dvorana ima jednu jedinu nadmorsku visinu, a odgovor je najmanja među njima. Sve ih nalazi jedan DFS. Svaki hodnik je zapisan u smeru od ulaza, pa `adj[u]` sadrži baš one dvorane koje su korak dublje od $u$, a pretraga ide samo dalje u dubinu. Visinu nosi naniže kao parametar i na svakom koraku joj dodaj razliku tog hodnika:

$$visina(\text{dete}) = visina(\text{roditelj}) + d$$

a usput pamti najmanju visinu na kojoj je pretraga stajala.

resenje je `min(h,lowest)`

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

void dfs(int v, int altitude, vector<vector<int>>& adj, vector<vector<int>>& diff, int& lowest) {

    lowest = min(lowest, altitude); // this hall may be the deepest one

    for(int i=0;i<adj[v].size();i++) {
        dfs(adj[v][i], altitude + diff[v][i], adj, diff, lowest);
    }
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int h, n;
        cin >> h >> n;

        vector<vector<int>> adj(n+1);  // adj[v] holds the halls the corridors from v lead to
        vector<vector<int>> diff(n+1); // diff[v][i] is the altitude change on that corridor

        for(int i=0;i<n-1;i++) {

            int u, v, d;
            cin >> u >> v >> d;

            adj[u].push_back(v); // the corridor always leads away from the entrance
            diff[u].push_back(d);
        }

        int lowest = h; // the entrance hall is hall 1, and it sits at altitude h

        dfs(1, h, adj, diff, lowest);

        cout << lowest << "\n";
    }

    return 0;
}
```

`adj[v][i]` i `diff[v][i]` čitaju se u paru - $i$-ti hodnik iz $v$ i korak koji on košta - pa u njih uvek ubacuj istovremeno. `visited` niza nema: svaki hodnik vodi dublje, pa nema ni puta nazad od kog bi se čuvali.

## Složenost

Vremenska složenost je $O(n)$.
Memorijska složenost je $O(n)$.
