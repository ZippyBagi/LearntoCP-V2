
## Pristup

Provera svakog kandidata $h$ brojanjem radova košta $O(n)$ po kandidatu, ukupno $O(n^2)$ - presporo. Sortiranje pretvara ceo zadatak u jedan prolaz.

Sortiraj citate **opadajuće**, najveći prvi. Sada pogledaj poziciju $i$ (brojeći od $1$): prvih $i$ radova su $i$ najcitiranijih, pa

- "postoji bar $i$ radova sa bar $i$ citata" važi tačno kada **$i$-ti rad na sortiranoj listi** ima bar $i$ citata.

Zato šetaj $h$ od početka: dok $(h+1)$-vi rad ima bar $h + 1$ citata, h-indeks može da raste. Prva pozicija na kojoj sortirana vrednost padne ispod svoje pozicije je mesto gde stajemo - sve posle nje je još manje.

**Pažnja:** h-indeks može da bude $0$ - naučnik čiji svi radovi imaju $0$ citata nikada ne uđe u petlju. Početak sa $h = 0$ to rešava bez posebnog slučaja.

## Primer

Prvi test primer sortiran opadajuće:

| pozicija | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---|---|---|---|---|---|---|---|
| citati | $17$ | $12$ | $9$ | $7$ | **$5$** | $5$ | $3$ | $0$ |

Na poziciji $5$ rad ima $5 \ge 5$ citata - i dalje u redu. Na poziciji $6$ rad ima $5 < 6$ - stop. H-indeks je $5$: pet radova sa bar pet citata, a šesti takav rad ne postoji.

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

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i];
        }

        sort(a.begin(), a.end());
        reverse(a.begin(), a.end()); // largest number of citations first

        int h = 0;
        while(h < n && a[h] >= h + 1){ // the (h+1)-th paper still has at least h+1 citations
            h++;
        }

        cout<<h<<'\n';
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n \log n)$.
Memorijska složenost je $O(n)$.
