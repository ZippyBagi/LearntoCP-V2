
## Pristup

Sve ovde gradimo od jedne funkcije - **orijentacije** tačke u odnosu na pravu. Za pravu kroz $A$ i $B$ i treću tačku $C$, znak izraza $\vec{AB} \times \vec{AC}$ nam kaže da li je $C$ levo (`+`), desno (`-`), ili tačno na pravoj (`=`).

Trebaće nam četiri takve vrednosti, pa hajde odmah da ih imenujemo:

$$abc, \; abd \quad \text{- gde su } C \text{ i } D \text{ u odnosu na pravu } AB$$

$$cda, \; cdb \quad \text{- gde su } A \text{ i } B \text{ u odnosu na pravu } CD$$

### Uredno ukrštanje

Krenimo od slike u kojoj se duži ukrštaju negde po sredini. Dve stvari moraju da važe istovremeno:

- $C$ i $D$ su sa **suprotnih strana** prave $AB$, znači $abc \ne abd$;
- $A$ i $B$ su sa **suprotnih strana** prave $CD$, znači $cda \ne cdb$.
### Kada neko padne tačno na pravu

Gornje pravilo traži da $C$ i $D$ završe sa **različitih strana** prave $AB$. Duž koja samo dodirne $AB$ i vrati se nikada to ne uradi - oba njena kraja ostaju sa iste strane, pa pravilo kaže ne, a tačan odgovor je da. Dve duži koje leže jedna preko druge padaju iz istog razloga.

Svi ti slučajevi ostavljaju isti trag: jedna od četiri orijentacije se vrati kao `=`. To je tačka koja dodiruje.

Ali `=` govori samo da je tačka na **pravoj**, a prava se pruža unedogled. I $(2,2)$ i $(6,6)$ leže na pravoj kroz $A = (0,0)$ i $B = (4,4)$, a samo je $(2,2)$ na duži. Zato dodatno proveravamo i da li je tačka unutar pravougaonika koji razapinju druge dve.

Bilo koja od četiri tačke može da bude ta koja dodiruje, pa imamo četiri provere - po jednu za svaku orijentaciju. Jedna jedina zajednička tačka je sve što zadatak traži, pa prva provera koja prođe završava posao.
## Primer

Četiri orijentacije za svaki red primera, gde su svuda $A = (0,0)$ i $B = (4,4)$:

| duž $CD$ | $abc$ | $abd$ | $cda$ | $cdb$ | šta se desilo | odgovor |
|---|---|---|---|---|---|---|
| $(0,4) - (4,0)$ | `+` | `-` | `-` | `+` | oba para se razlikuju | `YES` |
| $(0,10) - (10,0)$ | `+` | `-` | `-` | `-` | **$A$ i $B$ sa iste strane prave $CD$** | `NO` |
| $(4,4) - (8,0)$ | `=` | `-` | `-` | `=` | $C$ je na pravoj $AB$ i unutar pravougaonika | `YES` |
| $(2,2) - (6,6)$ | `=` | `=` | `=` | `=` | sve kolinearno, $C$ unutar pravougaonika | `YES` |
| $(1,0) - (5,4)$ | `-` | `-` | `+` | `+` | nijedan par se ne razlikuje | `NO` |

Proveri drugi red rukom: $\vec{CD} = (10, -10)$ i $\vec{CA} = (0, -10)$ daju $10 \cdot (-10) - (-10) \cdot 0 = -100$, a $\vec{CB} = (4, -6)$ daje $10 \cdot (-6) - (-10) \cdot 4 = -20$. Oba su negativna, pa drugi uslov pada i odgovor je `NO` - iako je prvi uslov bio zadovoljan.

I četvrti red: svaka orijentacija je `=`, pa prvi uslov ne može da se aktivira. Spasava nas provera pravougaonika - tačka $C = (2,2)$ je na pravoj $AB$ i unutar pravougaonika $[0,4] \times [0,4]$, pa je duži dele.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

struct v {
    long long x, y;
};

char orientation(v a, v b, v c) {

    // vektorski proizvod AB i AC - bitan je samo znak
    long long prod = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

    if(prod > 0) return '+';
    if(prod < 0) return '-';
    return '=';
}

bool inBox(v a, v b, v p) {

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool intersect(v a, v b, v c, v d) {

    char abc = orientation(a, b, c);
    char abd = orientation(a, b, d);
    char cda = orientation(c, d, a);
    char cdb = orientation(c, d, b);

    if(abc != abd && cda != cdb) return true; // duzi se uredno ukrstaju

    if(abc == '=' && inBox(a, b, c)) return true; // c lezi na duzi ab
    if(abd == '=' && inBox(a, b, d)) return true;
    if(cda == '=' && inBox(c, d, a)) return true;
    if(cdb == '=' && inBox(c, d, b)) return true;

    return false;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        v a, b, c, d;
        cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y >> d.x >> d.y;

        cout << (intersect(a, b, c, d) ? "YES" : "NO") << "\n";
    }

    return 0;
}
```
## Složenost

Vremenska složenost je $O(1)$ po test primeru.
Memorijska složenost je $O(1)$.
