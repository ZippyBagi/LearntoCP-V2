
## Pristup

Treba nam kolekcija snaga u koju možemo da dodajemo, iz koje možemo da brišemo i od koje možemo da tražimo najmanji i najveći element - i to sve dok se kolekcija stalno menja. Sortiran vektor bi odgovarao na pitanja odmah, ali bi svako ubacivanje koštalo $O(n)$, a običan `set` bi bio savršen da nema jednog detalja u postavci: dva mađioničara mogu biti **jednako jaka**, a `set` odbija da čuva istu vrednost dva puta.

Tu rupu popunjava `multiset`. Ponaša se kao set - uvek sortiran, $O(\log n)$ po operaciji - ali **čuva duplikate**. Svaki mađioničar u sali je jedan element, čak i kada im se snage poklope.

Sa tim izborom sve ispada samo od sebe:

- `i x` - `hall.insert(x)`;
- `m` - najmanji element, a to je prvi: `*hall.begin()`;
- `M` - najveći element, a to je poslednji: `*hall.rbegin()`;
- `e x` - ukloni jednog mađioničara snage $x$.

I `begin()` i `rbegin()` su pokazivači, pa `*` ispred njih čita vrednost na koju pokazuju, i oba su $O(1)$ - sortirana struktura svoj minimum i maksimum ionako drži na krajevima.

**Pažnja:** `hall.erase(x)` uklanja **svaku** kopiju vrednosti $x$ odjednom, čime bi iz sale nestali svi jednako jaki mađioničari umesto jednog. Da bismo uklonili samo jednog, idemo preko pokazivača: `hall.erase(hall.find(x))`. Postavka garantuje da je mađioničar snage $x$ prisutan, pa `find` ovde nikada ne vrati `hall.end()` - bez te garancije bismo morali prvo da proverimo.

**Pažnja:** `*hall.begin()` nad praznim multisetom je nedefinisano ponašanje, pa prazna sala mora da se obradi pre oba upita, a ne posle.

## Primer

Sala posle svakog događaja iz primera u postavci:

| događaj | sala | ispisano |
|---------|------|----------|
| `i 1` | $\{1\}$ | - |
| `i 5` | $\{1, 5\}$ | - |
| `i 5` | $\{1, 5, 5\}$ | - |
| `i 8` | $\{1, 5, 5, 8\}$ | - |
| `m` | $\{1, 5, 5, 8\}$ | **$1$** |
| `e 5` | $\{1, 5, 8\}$ | - |
| `e 8` | $\{1, 5\}$ | - |
| `M` | $\{1, 5\}$ | **$5$** |
| `e 5` | $\{1\}$ | - |
| `M` | $\{1\}$ | **$1$** |
| `e 1` | $\{\}$ | - |
| `m` | $\{\}$ | **$-$** |

Šesti red je onaj koji je bitan: `e 5` ostavlja $\{1, 5, 8\}$, sa jednom peticom i dalje unutra. Da smo napisali `hall.erase(5)`, obe kopije bi nestale, sledeći `M` bi ispisao $8$ umesto $5$, a i svaki odgovor posle njega bi bio pogrešan.

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

        int q;
        cin >> q;

        multiset<int> hall;

        while(q--) {

            char op;
            cin >> op;

            if(op == 'i') {
                int x;
                cin >> x;
                hall.insert(x);
            }
            else if(op == 'e') {
                int x;
                cin >> x;
                hall.erase(hall.find(x)); // find first, so only one copy leaves
            }
            else if(hall.empty()) cout << "-" << "\n";
            else if(op == 'm') cout << *hall.begin() << "\n";  // the smallest
            else cout << *hall.rbegin() << "\n";               // the largest
        }
    }

    return 0;
}
```

Čitanje događaja u `char` radi zato što `cin` preskače beline, pa se `m` i `M` čitaju kao oni sami i ostaju razlikovni - dva upita se razlikuju samo po veličini slova.

## Složenost

Vremenska složenost je $O(q \log q)$.
Memorijska složenost je $O(q)$.
