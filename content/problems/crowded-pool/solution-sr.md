
## Pristup

Proveriti svaki trenutak je nemoguće - vreme ide do $10^9$. Ali broj ljudi na bazenu se menja samo u $2n$ posebnih trenutaka: kada neko **dođe** ili **ode**. Između dva susedna događaja ništa se ne pomera, pa je dovoljno pratiti veličinu gužve na događajima.

Pretvori svakog posetioca u dva **događaja**: $(a, +1)$ za dolazak i $(b, -1)$ za odlazak. Sortiraj sve događaje po vremenu i prođi kroz njih sa tekućim brojačem:

- $+1$ - jedna osoba više na bazenu;
- $-1$ - jedna osoba manje.

Rezultat je najveća vrednost koju brojač ikada dostigne.

Jedan detalj odlučuje ispravnost: **šta kada događaji dele trenutak?** Posetilac koji odlazi u trenutku $x$ više nije tu, a onaj koji dolazi u $x$ već jeste - pa se u jednakim trenucima odlasci obrađuju **pre** dolazaka, inače bi se ta dva računala kao da se preklapaju. Sortiranje parova to rešava besplatno: $(x, -1)$ se sortira pre $(x, +1)$, jer se parovi porede po drugoj vrednosti kada su prve jednake.

-g> Ovu tehniku je bitno zapamtiti, jer će biti vrlo bitna kasnije! 
## Primer

Događaji primera iz postavke, sortirani - brojač dok prolaz ide preko njih:

| vreme | događaji | brojač |
|---|---|---|
| $1$ | $+1$, $+1$ | $2$ |
| $2$ | $-1$, $+1$ | $2$ |
| $3$ | $+1$ | $3$ |
| $4$ | $+1$, $+1$ | **$5$** |
| $5$ | $-1$, $-1$ | $3$ |
| $6$ | $-1$, $-1$, $+1$ | $2$ |
| $7$ | $-1$, $+1$ | $2$ |
| $8$ | $-1$, $-1$ | $0$ |

Pogledaj trenutak $2$: posetilac sa $[1, 2)$ odlazi pre nego što onaj sa $[2, 5)$ uđe, pa brojač padne na $1$ i vrati se na $2$. Vrhunac je $5$, u trenutku $4$ - rezultat.

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

        int n;
        cin>>n;

        vector<pair<int,int>> events; // (time, +1) is an arrival, (time, -1) a departure

        for(int i=0;i<n;i++){
            int a, b;
            cin>>a>>b;
            events.push_back({a, +1});
            events.push_back({b, -1});
        }

        sort(events.begin(), events.end()); // equal times: -1 sorts before +1, departures go first

        int cur = 0, best = 0;

        for(auto e : events){
            cur += e.second; // one person more or less at the pool
            best = max(best, cur);
        }

        cout<<best<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
