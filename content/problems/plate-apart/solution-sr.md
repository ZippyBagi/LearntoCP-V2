
## Pristup

Prošetaj duž reza od donje ivice do gornje. Jedan deo ti je tada uvek sa leve strane, a drugi uvek sa desne - zovimo ih **levi deo** i **desni deo**. Levi deo ćemo držati mirno, a desni pomerati za neki vektor $\vec{d}$.

### Segment po segment

Dva dela su pribijena jedan uz drugi duž celog reza, pa pogledaj jedan pravolinijski segment reza, od $P_i$ do $P_{i+1}$, i pitaj šta pomeranje za $\vec{d}$ radi **tu**. Samo dve stvari mogu da se dese: desni deo se odlepi od tog segmenta, ili se zabije u levi deo. Ništa treće - segment je prav, a $\vec d$ je jedan utvrđen smer.

Koja se od dve desi jeste pitanje o stranama, a na njih odgovara vektorski proizvod. Uz

$$\vec{e_i} = P_{i+1} - P_i$$

desni deo je sa desne strane vektora $\vec{e_i}$, pa se od tog segmenta odvaja tačno onda kada i $\vec d$ pokazuje desno od $\vec{e_i}$, ili tačno duž njega:

$$\vec{d} \times \vec{e_i} \ge 0$$

Znak $\ge$ umesto $>$ je namerno. Kada je vektorski proizvod $0$, deo klizi **duž** segmenta umesto da se odvaja od njega, a to je i dalje u redu - dva dela se očešu jedan o drugi i, pošto je ploča konačna, na kraju se ipak razdvoje.

### Svi segmenti odjednom

Pomeranje uspeva ako i samo ako jedno jedino $\vec d$ zadovoljava tu nejednakost za **svaki** segment reza. Znači odgovor više ne zavisi od toga gde je rez, ni koliko su mu delovi dugi, ni kolika je ploča - zavisi samo od **smerova** $\vec{e_i}$ kojima on putuje. Dva reza sastavljena od istih smerova drugim redom dobijaju isti odgovor.

Pročitaj sada nejednakost obrnuto. $\vec{d} \times \vec{e} \ge 0$ kaže da $\vec e$ leži **levo** od $\vec d$, ili tačno duž njega - to jest, $\vec e$ je negde u polukrugu koji počinje u $\vec d$ i briše $180°$ suprotno od kazaljke na satu. Znači pitanje je postalo:

> Postoji li polovina kruga koja drži **sve** smerove reza odjednom?

### Kako se ta polovina nalazi

Prvo, po jedna tačka za svaki smer. Dužine ovde ne nose ništa - dug segment i kratak koji gledaju na istu stranu postavljaju potpuno isti zahtev pred $\vec d$ - pa svako $\vec{e_i}$ podeli najvećim zajedničkim deliocem svoje dve koordinate. Cikcak od sto segmenata koji se smenjuju između dva smera skupi se na dve tačke, a sortiranje skupi ponavljanja jedno uz drugo pa `unique` može da ih izbaci.

Ono što ostane je šačica različitih tačaka razbacanih po krugu, a pitanje je da li neka polovina tog kruga drži sve njih.

Sada sama provera. Pretpostavi da one zaista sve staju u jedan zatvoren polukrug. Tada je ostatak kruga - bar $180°$ njega - prazan, a prazna deonica mora da sedne između dva **suseda** u sortiranom redosledu, zato što je upravo to što nešto stoji između njih ono što dva smera sprečava da budu susedi. Važi i obrnuto: ako su dva suseda razmaknuta $180°$ ili više, onda je sve ostalo natrpano u ono što preostane, a to je $180°$ ili manje. Dakle dve tvrdnje su ista tvrdnja:

> smerovi staju u polukrug tačno onda kada su neka dva suseda, u sortiranom redosledu, razmaknuta bar $180°$.

Zato se i porede samo **susedni** parovi. Širi par uvek ima neki drugi smer između sebe, pa nam ne govori ništa.

Nalaženje procepa usput odgovara i na pitanje "na koju stranu guramo". Ako veliki procep ide suprotno od kazaljke na satu od $\vec a$ do $\vec b$, uzmi $\vec d = \vec b$. Sve tada leži unutar $180°$ suprotno od kazaljke od $\vec b$ - a to je tačno ono što je tražila rečenica "svako $\vec e$ je levo od $\vec d$".

Merenje procepa ne traži pravi ugao. Idući suprotno od kazaljke na satu od suseda $\vec a$ do sledećeg $\vec b$, procep je negde u $(0°, 360°)$, a jedan vektorski proizvod deli taj raspon:

| $\vec a \times \vec b$ | procep od $\vec a$ do $\vec b$ |
|---|---|
| $> 0$ | manji od $180°$ |
| $< 0$ | veći od $180°$ |
| $= 0$, uz $\vec a \cdot \vec b < 0$ | tačno $180°$ |
| $= 0$, uz $\vec a \cdot \vec b > 0$ | nikakav - isti smer dvaput |

Poslednji red ne može da se desi između suseda, pošto je `unique` već izbacio ponavljanja. Može da iskrsne jedino kada preostane jedan jedini smer pa ga petlja poredi sa samim sobom, a taj slučaj je suprotan od onoga što red kaže: jedan smer znači da je rez prav, ceo krug je jedan ogroman procep, i delovi se sasvim sigurno rastavljaju. Zato se on rešava posebno, pre petlje, kroz `m == 1`.

Susedi idu u krug, a ne u red, pa mora da se proveri i par (poslednji, prvi) - to radi `% m`.

**Pažnja:** sortiranje po uglu traži komparator, a `atan2` nije taj komparator. Podeli smerove na gornju polovinu kruga ($y > 0$, plus $y = 0$ uz $x > 0$) i donju, prvo poređaj te dve grupe, a unutar grupe uporedi dva smera pomoću $\vec a \times \vec b > 0$. Sve u celim brojevima, bez zaokruživanja.

**Pažnja:** vektorski proizvodi moraju da se računaju u tipu `long long`. Koordinata ide do $10^6$, pa segment ide do $2 \cdot 10^6$, a vektorski proizvod do $8 \cdot 10^{12}$ - daleko preko `int`.

## Primer

Prvi rez, $(3,0) (2,2) (3,1) (3,4) (2,3) (3,5)$, ima pet segmenata:

| segment | $\vec{e_i}$ | smer | ugao |
|---|---|---|---|
| $(3,0) \rightarrow (2,2)$ | $(-1, 2)$ | $(-1, 2)$ | $116.57°$ |
| $(2,2) \rightarrow (3,1)$ | $(1, -1)$ | $(1, -1)$ | $315°$ |
| $(3,1) \rightarrow (3,4)$ | $(0, 3)$ | $(0, 1)$ | $90°$ |
| $(3,4) \rightarrow (2,3)$ | $(-1, -1)$ | $(-1, -1)$ | $225°$ |
| $(2,3) \rightarrow (3,5)$ | $(1, 2)$ | $(1, 2)$ | $63.43°$ |

Sortirano po uglu, pet smerova sedi na $63.43°, 90°, 116.57°, 225°, 315°$, a procepi između suseda su $26.57°, 26.57°, 108.43°, 90°$ i $108.43°$ nazad do početka. Najveći je samo $108.43°$, pa nijedan polukrug ne drži svih pet i odgovor je `NO`.

Drugi rez je cikcak $(-1,1), (1,1), (-1,1), (1,1), (-1,1)$, a to su posle izbacivanja duplikata samo **dva** smera: $45°$ i $135°$. Dva procepa su $90°$ i $270°$, a $270°$ je više nego dovoljno - bilo šta iz tog procepa radi kao $\vec d$, na primer $\vec d = (1, 0)$, pravo udesno. Odgovor je `YES`.

## Kod

solution.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct v{

    ll x, y;
};

ll cross(v a, v b){

    return (a.x * b.y) - (a.y * b.x);
}

ll dot(v a, v b){

    return (a.x * b.x) + (a.y * b.y);
}

// 0 for the upper half of the circle, 1 for the lower one
int half(v a){

    return (a.y < 0 || (a.y == 0 && a.x < 0)) ? 1 : 0;
}

bool byAngle(v a, v b){

    if(half(a) != half(b)) return half(a) < half(b);
    return cross(a, b) > 0;
}

bool same(v a, v b){

    return a.x == b.x && a.y == b.y;
}

int main() {
    iostream::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;

    while(t--) {

        ll w, h;
        int n;
        cin >> w >> h >> n;

        vector<v> p(n);
        for(int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;

        vector<v> dir;

        for(int i = 0; i + 1 < n; i++) {

            v e = {p[i + 1].x - p[i].x, p[i + 1].y - p[i].y};

            ll g = __gcd(llabs(e.x), llabs(e.y));      // keep only the direction
            e.x /= g;
            e.y /= g;

            dir.push_back(e);
        }

        sort(dir.begin(), dir.end(), byAngle);
        dir.erase(unique(dir.begin(), dir.end(), same), dir.end());

        int m = dir.size();
        bool ok = (m == 1);                            // one direction only - a straight cut

        for(int i = 0; i < m && !ok; i++) {

            v a = dir[i], b = dir[(i + 1) % m];        // neighbours around the circle

            ll c = cross(a, b);

            // the turn from a to b is more than half a circle, or exactly half of it
            if(c < 0 || (c == 0 && dot(a, b) < 0)) ok = true;
        }

        cout << (ok ? "YES" : "NO") << "\n";
    }

    return 0;
}
```

`w` i `h` se učitaju i više se nikada ne koriste. To nije previd - veličina ploče zaista ne može da promeni odgovor, a vredi primetiti da ne može.

`unique` izbacuje samo **susedne** duplikate, i baš zato sortiranje mora da dođe pre njega.

Ni najveći zajednički delilac nije ukras. Izbaci ga i prav rez zapisan kao dva komada različitih dužina - recimo $(2, 3)$ pa $(4, 6)$ - stiže do `unique` kao dva različita vektora i preživljava kao dva smera. Prečica `m == 1` nikada ne opali, petlja između njih nađe procep od ničega, i odgovor se vrati kao `NO` za rez koji bi i dete rastavilo.

## Složenost

Vremenska složenost je $O(n \log n)$ po test primeru, i sve to je sortiranje
Memorijska složenost je $O(n)$
