
## Pristup

Pustimo iz tačke $T$ polupravu pravo udesno i prebrojimo koliko stranica ograde ona preseca.

Daleko desno smo sigurno spolja, a svaki presek nas prebacuje iz spolja u unutra i nazad. Znači **neparan** broj preseka govori da je $T$ unutra, a **paran** da je spolja, koliko god ograda bila iskrivljena.

### Kako se broji presek

Stranicu uopšte vredi gledati samo ako prelazi preko visine tačke $T$ - jedan kraj iznad, drugi ispod. Zapisano kao `(a.y > t.y) != (b.y > t.y)`, sa **strogo iznad** sa obe strane, to rešava i slučaj kada poluprava prođe tačno kroz ugao: ugao pripada onoj stranici čiji je drugi kraj iznad njega, i samo njoj. Bez ovakvog pravila obe stranice koje se sastaju u tom uglu bivaju prebrojane i parnost je pogrešna.

Zatim presek mora da bude **desno** od $T$, a to je pitanje o stranama, pa na njega odgovara `orientation`. Za stranicu koja ide nagore presek je desno tačno kada je $T$ levo od nje, a za stranicu koja ide nadole znak je obrnut.

### Sama ograda

Poluprava ne govori ništa pouzdano o tački koja leži **na** stranici - ispada unutra ili spolja u zavisnosti od toga kojim smerom ta stranica slučajno ide. Pošto zadatak računa ogradu kao unutrašnjost, prvo proveravamo stranice sa `onSegment` i odgovaramo `YES` čim jedna od njih sadrži $T$. Tek ako nijedna ne sadrži, vraćamo se na parnost.

**Pažnja:** vektorski proizvodi unutar funkcije `orientation` moraju da se računaju u tipu `long long`. Koordinata ide do $10^9$, razlika do $2 \cdot 10^9$, a ceo izraz do $8 \cdot 10^{18}$.

## Primer

Prvi test primer je slovo `C`, a $T = (2, 2)$ stoji u njegovom urezu. Nijedna stranica ne sadrži $T$, pa brojimo. Svih osam stranica, redom obilaska:

| stranica | prelazi preko $y = 2$ | presek desno od $T$ |
|---|---|---|
| $(0,0) - (5,0)$ | ne | |
| $(5,0) - (5,1)$ | ne | |
| $(5,1) - (1,1)$ | ne | |
| $(1,1) - (1,3)$ | **da** | ne, on je na $x = 1$ |
| $(1,3) - (5,3)$ | ne | |
| $(5,3) - (5,4)$ | ne | |
| $(5,4) - (0,4)$ | ne | |
| $(0,4) - (0,0)$ | **da** | ne, on je na $x = 0$ |

Samo dve stranice prelaze preko visine tačke $T$, i obe su joj sleva, pa je broj preseka nula. Paran, pa je odgovor `NO` - urez je spolja, iako ga ograda obavija sa tri strane. U drugom test primeru, kvadratu, dve stranice prelaze preko visine tačke $T$ i samo je $(5,0) - (5,5)$ njoj zdesna: jedan presek, neparan, `YES`.

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

bool onSegment(v a, v b, v p) {

    if(orientation(a, b, p) != '=') return false;

    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool crossesToTheRight(v a, v b, v t) {

    if((a.y > t.y) == (b.y > t.y)) return false; // stranica ne prelazi preko visine tacke t

    char o = orientation(a, b, t);

    return (b.y > a.y) ? (o == '+') : (o == '-'); // da li je presek desno od t
}

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

        v q;
        cin >> q.x >> q.y;

        bool inside = false;
        int crossings = 0;

        for(int i = 0; i < n; i++) {
            int j = (i + 1) % n;

            if(onSegment(p[i], p[j], q)) { // na ogradi - racuna se kao unutra
                inside = true;
                break;
            }

            if(crossesToTheRight(p[i], p[j], q)) crossings++;
        }

        if(!inside) inside = (crossings % 2 == 1);

        cout << (inside ? "YES" : "NO") << "\n";
    }

    return 0;
}
```

Smer obilaska se nigde ne pojavljuje. I u smeru kazaljke i suprotno dobijamo iste preseke, pa ništa ne moramo unapred da svodimo na isti smer.

## Složenost

Vremenska složenost je $O(n)$ po test primeru.
Memorijska složenost je $O(n)$.
