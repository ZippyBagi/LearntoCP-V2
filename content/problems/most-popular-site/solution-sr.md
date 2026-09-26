
## Pristup

Svaki link $u \rightarrow v$ govori dve stvari: sa sajta $u$ polazi jedan link, a na sajt $v$ stiže jedan. Ništa drugo u ulazu ta dva broja ne menja, a nas i ne zanimaju odvojeno, nego samo njihova razlika - pa je jedan niz dovoljan:

$$popularnost[v] = (\text{linkovi ka } v) - (\text{linkovi od } v)$$

Kada pročitaš link, uradi dve izmene: `popularnost[v]++` i `popularnost[u]--`. Na kraju prođi kroz sajtove od $1$ do $n$ i pamti najboljeg, ali poredi **strogim** `>`. Pošto ideš od manjeg broja ka većem, sajt koji se samo izjednači sa trenutno najboljim neće ga zameniti, pa manji redni broj pobeđuje sam od sebe.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n, m;
        cin >> n >> m;

        vector<int> pop(n+1, 0); // pop[v] = links into v minus links out of v

        for(int i=0;i<m;i++) {

            int u, v;
            cin >> u >> v;

            if(u == v) continue; // a link from a site to itself is ignored

            pop[v]++; // one more link leading in
            pop[u]--; // one more link leading out
        }

        int best = 1;

        for(int v=2;v<=n;v++) {
            if(pop[v] > pop[best]) best = v; // strict >, so a tie keeps the smaller number
        }

        cout << best << " " << pop[best] << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O(n + m)$.
Memorijska složenost je $O(n)$.
