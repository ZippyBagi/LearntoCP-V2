
## Pristup

Svi stubovi leže na jednoj pravoj, pa ih razlikuje jedino to **koliko su daleko duž te prave**. Ako svakom stubu zakačimo jedan broj koji raste kako putujemo, sortiranje po tom broju je ceo zadatak.

### Taj broj

Smer kretanja nam poklanjaju prva dva stuba:

$$\vec{d} = P_1 - P_0$$

Uzmi sada bilo koji stub $P_i$ i vektor $\vec{P_0 P_i}$ koji pokazuje ka njemu iz prvog stuba. Oba vektora leže na istoj pravoj, dakle paralelni su, pa je **skalarni proizvod**

$$\vec{P_0 P_i} \cdot \vec{d}$$

pozitivan kada je $P_i$ ispred $P_0$ u smeru kretanja, negativan kada je iza, a $0$ jedino za sam $P_0$. To je tačno broj koji smo tražili.

Ta vrednost nije rastojanje - ona je rastojanje pomnoženo sa $|\vec{d}|$, a to je ista pozitivna konstanta za svaki stub u test primeru. Zajednički pozitivan činilac nikada ne menja poredak, pa možemo da sortiramo direktno po njoj i da nikada ne dodirnemo koren.

### Zašto ne prosto po $x$

Zato što prava može da stane uspravno. Tada svi stubovi imaju isto $x$, pa ih sortiranje po $x$ ostavlja netaknutim. Sortiranje po $y$ puca na horizontalnoj pravoj na isti način, a biranje između "rastuće" i "opadajuće" je još jedna stvar koja može da se pogreši. Skalarni proizvod odgovara na sva tri pitanja odjednom: bira pravu koordinatu, meri obe, i već gleda na pravu stranu zato što $\vec{d}$ gleda.

**Pažnja:** skalarni proizvod mora da se računa u tipu `long long`. Koordinata ide do $10^6$, razlika do $2 \cdot 10^6$, a dva proizvoda zajedno do $8 \cdot 10^{12}$ - daleko preko `int`.

## Primer

Prvi test primer, sa $P_0 = (9, 4)$ i $P_1 = (5, 2)$, dakle $\vec{d} = (-4, -2)$:

| stub $P_i$ | $\vec{P_0 P_i}$ | $\vec{P_0 P_i} \cdot \vec{d}$ |
|---|---|---|
| $(9, 4)$ | $(0, 0)$ | $0$ |
| $(5, 2)$ | $(-4, -2)$ | $20$ |
| $(15, 7)$ | $(6, 3)$ | $-30$ |
| $(7, 3)$ | $(-2, -1)$ | $10$ |
| $(13, 6)$ | $(4, 2)$ | $-20$ |

Sortirano po poslednjoj koloni dobijamo $-30, -20, 0, 10, 20$, a to su stubovi $(15, 7), (13, 6), (9, 4), (7, 3), (5, 2)$ - traženi odgovor. Primeti da $(15,7)$ ima najveće $x$ od svih i ipak dolazi prvi, zato što kabina putuje ulevo.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

struct v{

    long long x, y;
};

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        int n;
        cin >> n;

        vector<v> p(n);
        for(int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;

        // the cabin travels from the first pylon towards the second one
        v d = {p[1].x - p[0].x, p[1].y - p[0].y};

        vector<pair<long long, int>> key(n);

        for(int i = 0; i < n; i++) {

            // dot product of (p[i] - p[0]) and d - how far along the travel direction
            long long along = (p[i].x - p[0].x) * d.x + (p[i].y - p[0].y) * d.y;

            key[i] = {along, i};
        }

        sort(key.begin(), key.end());

        for(int i = 0; i < n; i++) {
            cout << p[key[i].second].x << " " << p[key[i].second].y << "\n";
        }
    }

    return 0;
}
```

Sami stubovi se nikada ne premeštaju - sortiramo listu parova `(ključ, indeks)` i ispisujemo preko indeksa. Pošto su stubovi različiti i kolinearni, nikoja dva ključa ne mogu da budu jednaka, pa nema izjednačenja koja bi trebalo razrešavati.

## Složenost

Vremenska složenost je $O(n \log n)$ po test primeru
Memorijska složenost je $O(n)$
