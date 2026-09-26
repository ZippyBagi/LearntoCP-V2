
## Pristup

Brojanje prolaznika jednog po jednog košta $O(n)$ po pitanju - ukupno do $4 \cdot 10^{10}$ koraka. Poeni su već sortirani, pa je ovo posao za funkcije binarne pretrage iz lekcije.

Jedna caka: `lower_bound` i `upper_bound` rade samo nad nizovima sortiranim **rastuće**, a Majina tabela je sortirana opadajuće. Najjednostavnije rešenje - **obrni** niz jednom posle čitanja.

U rastućem nizu, takmičari sa bar $p$ poena čine **rep** niza: sve od prvog elementa $\ge p$ do kraja. A "prvi element $\ge p$" je tačno definicija funkcije `lower_bound`:

- `idx = lower_bound(a.begin(), a.end(), p) - a.begin()` - pozicija prvog broja poena koji nije premali;
- odgovor je `n - idx` - veličina repa.

Svako pitanje je sada jedna binarna pretraga, $O(\log n)$.


**Pažnja:** oduzimanje `a.begin()` pretvara iterator u indeks - bez njega imaš poziciju u memoriji, a ne broj.

## Primer

Obrnuta, tabela je $[23, 56, 73, 73, 89]$:

| $p$ | prvi poeni $\ge p$ | `idx` | odgovor $n - idx$ |
|---|---|---|---|
| $95$ | nema | $5$ | $0$ |
| $50$ | $56$ | $1$ | $4$ |
| $70$ | $73$ | $2$ | $3$ |
| $0$ | $23$ | $0$ | $5$ |

Pogledaj red za $70$: prvi rezultat sa bar $70$ poena je $73$ na poziciji $2$, a iza njega stoji $5 - 2 = 3$ takmičara - tačno tri koja prolaze.

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

        vector<int> a(n);
        for(int i=0;i<n;i++){
            cin>>a[i]; // sorted from the largest to the smallest
        }

        reverse(a.begin(), a.end()); // lower_bound needs ascending order

        while(m--){
            int p;
            cin>>p;
            int idx = lower_bound(a.begin(), a.end(), p) - a.begin(); // first score >= p
            cout<<n - idx<<'\n'; // everything from there on passes
        }
    }
    return 0;
}
```

## Složenost

Vremenska složenost je $O(n + m \log n)$.
Memorijska složenost je $O(n)$.
