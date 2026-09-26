
## Pristup

Redosled elemenata je upravo ono što smemo da ignorišemo, pa nam ostaje **koliko se puta koja vrednost pojavljuje**. Dva niza su permutacije jedan drugog tačno onda kada se svaka vrednost u oba javlja isti broj puta.

Brojanje pojavljivanja je posao za mapu, pa napravi po jednu mapu za svaki niz sa `a[x]++` i `b[x]++`, a onda ih prosto uporedi. Dve mape su jednake kada sadrže iste ključeve sa istim vrednostima, a to je tačno gornji uslov.

Primeti da dužine uopšte ne moramo da poredimo. Ako se mape poklapaju, poklapaju se svi brojači, pa se poklapaju i zbirovi.

**Pažnja:** vrednosti idu do $10^{18}$, što je daleko preko onoga što staje u `int` (oko $2.1 \cdot 10^9$). Tip ključa mora da bude `long long`, pa su mape `map<long long, int>` - ogromni su samo ključevi, brojači ostaju mali.

Pošto mape samo poredimo i nikada nam ne trebaju ključevi u redosledu, ovde jednako dobro radi i `unordered_map`.

## Primer

| test primer | brojači prvog niza | brojači drugog niza | jednake |
|-------------|--------------------|---------------------|---------|
| $1$ | $\{1{:}1, \ 2{:}1, \ 3{:}2, \ 4{:}1\}$ | $\{1{:}1, \ 2{:}1, \ 3{:}2, \ 4{:}1\}$ | **YES** |
| $2$ | $\{5{:}1, \ 10^{18}{:}2\}$ | $\{5{:}2, \ 10^{18}{:}1\}$ | **NO** |

Obe mape prvog test primera drže jednu $1$, jednu $2$, dve $3$ i jednu $4$, bez obzira na to kojim su ih redom nizovi nabrojali. U drugom test primeru pojavljuju se ista dva ključa, ali sa zamenjenim brojačima.

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

        int n;
        cin >> n;

        map<long long, int> a; // how many times each value appears in the first array

        for(int i = 0; i < n; i++) {
            long long x;
            cin >> x;
            a[x]++;
        }

        int m;
        cin >> m;

        map<long long, int> b;

        for(int i = 0; i < m; i++) {
            long long x;
            cin >> x;
            b[x]++;
        }

        if(a == b) cout << "YES" << "\n";
        else cout << "NO" << "\n";
    }

    return 0;
}
```

## Složenost

Vremenska složenost je $O((n + m) \log n)$.
Memorijska složenost je $O(n + m)$.
