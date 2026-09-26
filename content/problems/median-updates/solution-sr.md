
## Pristup

Držati sortiran vektor i ponovo ga sortirati posle svake nove plate je mnogo presporo. Ali primeti šta se zapravo traži: ne sortiran redosled, nego samo **ono što stoji na njegovoj sredini**. To je mnogo manje informacija, a red sa prioritetom ume da nam da tačno jedan element - svoj vrh.

Zato podelimo plate na dve polovine i svaku držimo u svom redu:

- `low` - **max-heap** koji drži **manju polovinu**, pa mu je na vrhu najveća od malih vrednosti;
- `high` - **min-heap** koji drži **veću polovinu**, pa mu je na vrhu najmanja od velikih vrednosti.

Sve vreme održavamo dva pravila. Prvo, svaka vrednost u `low` je najviše jednaka svakoj vrednosti u `high`. Drugo, `low` ima ili isto elemenata kao `high`, ili tačno jedan više.

Uz ta dva pravila vrhovi redova **jesu** sredina sortiranog niza. Ako su veličine jednake, ukupan broj je paran i dve središnje vrednosti su `low.top()` i `high.top()`, pa je medijana njihova sredina. Ako `low` ima jedan element više, broj je neparan i taj višak je središnji element, pa je medijana `low.top()`.

### Ubacivanje plate

Nova plata $x$ pripada manjoj polovini ako nije veća od najveće male vrednosti, pa je guramo u `low` kada je `x <= low.top()`, inače u `high`. To čuva prvo pravilo, ali može da pokvari drugo - jedan red je sada za jedan element prevelik.

Popravka je jedan jedini potez. Ako je `low` narastao na dva više od `high`, uzmi `low.top()` (najveću malu vrednost) i gurni je u `high`. Ako je `high` postao veći od `low`, uzmi `high.top()` (najmanju veliku vrednost) i gurni je u `low`. Premešteni element je granični, pa pada na tačnu stranu i prvo pravilo ostaje netaknuto.

**Pažnja:** `top()` nad praznim redom sa prioritetom je nedefinisano ponašanje. Prva plata mora da uđe u `low` bez ijednog pitanja `low.top()` - provera `low.empty()` u kodu je tu zbog toga.

## Primer

Redovi posle svake operacije iz primera u postavci:

| operacija | `low` (max-heap) | `high` (min-heap) | ispisano |
|-----------|------------------|-------------------|----------|
| `d 5` | $\{5\}$ | $\{\}$ | - |
| `d 7` | $\{5\}$ | $\{7\}$ | - |
| `d 6` | $\{5, 6\}$ | $\{7\}$ | - |
| `m` | $\{5, 6\}$ | $\{7\}$ | **$6.0$** |
| `d 8` | $\{5, 6\}$ | $\{7, 8\}$ | - |
| `m` | $\{5, 6\}$ | $\{7, 8\}$ | **$6.5$** |

Pogledaj treći red: $6$ je veće od `low.top()` $= 5$, pa prvo ide u `high`, čime `high` postaje veći od `low` - i potez za balansiranje vraća $6$ u `low`. Kod prvog `m` veličine su $2$ i $1$, pa je odgovor `low.top()` $= 6$. Kod drugog su $2$ i $2$, pa je $(6 + 7) / 2 = 6.5$.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    cout << fixed << setprecision(1);

    int t;
    cin >> t;

    while(t--) {

        int q;
        cin >> q;

        priority_queue<int> low;                             // smaller half, biggest on top
        priority_queue<int, vector<int>, greater<int>> high;  // bigger half, smallest on top

        while(q--) {

            char op;
            cin >> op;

            if(op == 'd') {

                int x;
                cin >> x;

                if(low.empty() || x <= low.top()) low.push(x);
                else high.push(x);

                if(low.size() > high.size() + 1) { // low grew too big
                    high.push(low.top());
                    low.pop();
                }
                else if(high.size() > low.size()) { // high may never be the bigger one
                    low.push(high.top());
                    high.pop();
                }
            }
            else {
                if(low.size() == high.size()) cout << (low.top() + high.top()) / 2.0 << "\n";
                else cout << (double)low.top() << "\n";
            }
        }
    }

    return 0;
}
```

`cout << fixed << setprecision(1)` govori `cout`-u da svaki sledeći realan broj ispiše sa tačno jednom decimalom, a to je upravo ono što traži format izlaza.

## Složenost

Vremenska složenost je $O(q \log q)$.
Memorijska složenost je $O(q)$.
