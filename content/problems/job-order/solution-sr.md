
## Pristup

Ovo je Kanov algoritam iz lekcije, uz dve male ispravke.

### Na koju stranu gleda strelica?

Linija `x y` sa ulaza kaže da posao $y$ ide **pre** posla $x$, pa strelica vodi $y \rightarrow x$ - drugi broj je izvor. Ako se to okrene naopako, dobija se sasvim ispravan topološki poredak obrnutog grafa, dakle greška koja i dalje izgleda uverljivo, pa vredi proveriti na primeru pre nego što se bilo čemu poveruje.

Kad je to sređeno, `indegree[v]` broji koliko poslova mora da se završi pre nego što $v$ može da počne, a posao je spreman tačno onda kad mu indegree padne na $0$.

### Kako dobiti najmanji poredak

Red iz lekcije vraća **neki** ispravan poredak - onaj koji ispadne iz redosleda pristizanja u red. Nama treba tačno određen, a pravilo je kratko: u svakom koraku, među svim poslovima koji su trenutno spremni, uzmi onaj sa **najmanjim brojem**.

To je pohlepno (greedy), i ispravno je zato što je izbor slobodan: svaki spreman posao sme da ide sledeći, a uzimanje najmanjeg ne može kasnije da zaključa neki manji - posao koji je spreman i ostaje spreman, jer se indegree nikad ne vraća naviše. Znači, na prvom mestu na kom bi se naš poredak razlikovao od nekog drugog ispravnog, naš ima manji broj.

Prevesti "najmanji spreman posao" u kod je izmena od jedne reči, baš kao što lekcija na kraju i kaže:

~!
```cpp
priority_queue<int, vector<int>, greater<int>> q;
```

`greater<int>` pretvara podrazumevani max-heap u min-heap, pa je `q.top()` najmanji spreman posao umesto najvećeg. Jedina druga izmena je `q.top()` tamo gde lekcija ima `q.front()`.

**Pažnja:** to košta $O(\log n)$ po ubacivanju i vađenju umesto $O(1)$, pa ukupno postaje $O(n \log n + m)$ umesto $O(n + m)$. I dalje je sasvim brzo, a zaobilaznice nema - običan red prosto ne može da obeća najmanji poredak.

Postavka garantuje da poredak postoji, pa slučaj "red se ispraznio prerano" ne moramo ni da obrađujemo.

## Primer

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

## Složenost

Vremenska složenost je $O(n \log n + m)$.
Memorijska složenost je $O(n + m)$.
